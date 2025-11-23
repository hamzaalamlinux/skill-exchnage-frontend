'use client';

interface Skill {
    id: number;
    name: string;
    level: string;
}

interface SkillCardProps {
    skill: Skill;
    onRequest: (id: number) => void;
}

export default function SkillCard({ skill, onRequest }: SkillCardProps) {
    return (
        <div className="p-5 bg-white shadow rounded-xl">
            <h3 className="text-lg font-bold">{skill.name}</h3>
            <p className="text-gray-600">{skill.level}</p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => onRequest(skill.id)}>Request</button>
        </div>
    );
}