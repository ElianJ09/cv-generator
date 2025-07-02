'use client';

import React, { useState, useEffect } from 'react';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

type CVDocumentProps = {
  name: string;
  email: string;
  education: string;
  experience: string;
};

const CVDocument = ({ name, email, education, experience }: CVDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>{name || 'Your Name'}</Text>
        <Text>{email || 'your@email.com'}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Education</Text>
        <Text>{education || 'Your education details here'}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Experience</Text>
        <Text>{experience || 'Your experience details here'}</Text>
      </View>
    </Page>
  </Document>
);

export default function CVGeneratorPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    experience: '',
  });

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const blob = await pdf(
        <CVDocument
          name={formData.name}
          email={formData.email}
          education={formData.education}
          experience={formData.experience}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      return () => URL.revokeObjectURL(url);
    }, 500); 

    return () => clearTimeout(timeout);
  }, [formData]); 

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      <div className="w-full lg:w-1/2 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Real-time CV Generator</h1>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="name" placeholder="Name" className="border p-2 rounded" onChange={handleChange} value={formData.name} />
          <input type="email" name="email" placeholder="Email" className="border p-2 rounded" onChange={handleChange} value={formData.email} />
          <textarea name="education" placeholder="Education" className="border p-2 rounded" onChange={handleChange} value={formData.education} />
          <textarea name="experience" placeholder="Experience" className="border p-2 rounded" onChange={handleChange} value={formData.experience} />
        </form>
      </div>
      <div className="w-full lg:w-1/2 p-6 overflow-auto">
        {pdfUrl ? (
          <iframe src={pdfUrl} width="100%" height="100%" className="border rounded shadow" />
        ) : (
          <p className="text-gray-500">Start typing to preview your CV in real-time</p>
        )}
      </div>
    </div>
  );
}