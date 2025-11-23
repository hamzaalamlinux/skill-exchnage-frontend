'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import SkillCard from '@/components/SkillCard';

interface Skill {
  id: number;
  name: string;
  level: string;
}

export default function Home() {
  const [skills, setSkills] = useState<Skill[]>([]); // type your state

  useEffect(() => {
    api.get('/skills').then(res => {
      setSkills(res.data as Skill[]); // cast API response
    });
  }, []);

  const handleRequest = (id: number) => { // type your function parameter
    api.post('/skill-requests', { skill_id: id }).then(() => alert('Requested'));
  };
  
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-5 text-blue-700">SkillSwap</h1>
      <p className="text-gray-600 mb-10">Barter your skills. Learn anything. Teach anything.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(skill => <SkillCard key={skill.id} skill={skill} onRequest={handleRequest} />)}
      </div>
    </div>
  );
}