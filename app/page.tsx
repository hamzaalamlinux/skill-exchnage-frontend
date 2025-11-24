'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import SkillCard from '@/components/SkillCard';

interface Skill {
  id: number;
  name: string;
  level: string;
  description?: string;
}

export default function Home() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    api.get('/skills').then(res => {
      setSkills(res.data as Skill[]);
    }).catch(err => console.error(err));
  }, []);

  const handleRequest = (id: number) => {
    api.post('/skill-requests', { skill_id: id })
       .then(() => alert('Skill requested successfully!'))
       .catch(() => alert('Request failed'));
  };

  return (
    <div className="text-center py-10 px-4">
      <h1 className="text-5xl font-extrabold mb-4 text-blue-700">SkillSwap</h1>
      <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">Barter your skills. Learn anything. Teach anything.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map(skill => (
          <SkillCard key={skill.id} skill={skill} onRequest={handleRequest} />
        ))}
      </div>
    </div>
  );
}
