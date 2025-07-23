"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Article {
  _id: string;
  title: string;
  content: string;
  language: string;
  category?: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<Article[]>('http://localhost:5000/api/articles');
        setArticles(response.data);
      } catch (err) {
        setError('Failed to fetch articles.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading articles...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to UniTranslate!</h1>
      <h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length === 0 ? (
          <p>No articles found. Add some from the backend!</p>
        ) : (
          articles.map((article) => (
            <div key={article._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-gray-700 mb-2">{article.content.substring(0, 100)}...</p>
              <p className="text-sm text-gray-500">Language: {article.language}</p>
              {article.category && <p className="text-sm text-gray-500">Category: {article.category}</p>}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
