'use client';

interface Skill {
    id: number;
    name: string;
    level: string;
    description?: string;
}

interface SkillCardProps {
    skill: Skill;
    onRequest: (id: number) => void;
}

export default function SkillCard({ skill, onRequest }: SkillCardProps) {
    return (
        <div className="p-5 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{skill.name}</h3>
            <p className="text-sm text-gray-500 mb-3">Level: {skill.level}</p>
            {skill.description && <p className="text-gray-600 mb-3">{skill.description}</p>}
            <button 
                className="mt-2 w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => onRequest(skill.id)}
            >
                Request Skill
            </button>
        </div>
    );
}