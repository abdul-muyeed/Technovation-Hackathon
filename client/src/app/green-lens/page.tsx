"use client";

import uploadImage from "@/actions/uploadImage";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

type RecyclingInfo = {
  category: string;
  confidence: number;
  environmental_impact: number;
  reward_points: number;
  recycling_tips: string[];
};

export default function Page() {
  const [file, setFile] = useState<File | null>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: ()=>{
        toast.success('successfully uploaded');
    },
    onError: (err:string)=>{
        toast.error(err);
    }
  });

  const handleUpload = () => {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    mutation.mutate({form});
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Recycle Lens</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={!file || mutation.isPending}
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
      >
        {mutation.isPending ? "Uploading..." : "Upload"}
      </button>

      {mutation.data && (
        <div className="mt-6 p-4 border rounded-lg shadow bg-gray-50">
          <h2 className="text-xl font-semibold">Analysis Result</h2>
          <p>
            <strong>Category:</strong> {mutation.data['category']}
          </p>
          <p>
            <strong>Confidence:</strong>{" "}
            {(mutation.data['confidence'] * 100).toFixed(2)}%
          </p>
          <p>
            <strong>Environmental Impact:</strong> {mutation.data.environmental_impact}
          </p>
          <p>
            <strong>Reward Points:</strong> {mutation.data.reward_points}
          </p>

          <h3 className="mt-3 font-semibold">Recycling Tips:</h3>
          <ul className="list-disc list-inside">
            {mutation.data['recycling_tips'].map((tip:string, i:number) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
