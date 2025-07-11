import React from 'react';
import ChromaGrid from './ChromaGrid';

const items = [
  {
    image: "/VictorPFP.jpg",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
  },
  {
    image: "/AngelPFP.jpg",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
  },
  {
    image: "/BalaAvatar.jpg",
    title: "Ava Thompson",
    subtitle: "DevOps Engineer",
    handle: "@avathompson",
    borderColor: "#EF4444",
    gradient: "linear-gradient(135deg, #EF4444, #000)",
  },
  {
    image: "/JenPFP.jpg",
    title: "Liam Patel",
    subtitle: "UI/UX Designer",
    handle: "@liampatel",
    borderColor: "#6366F1",
    gradient: "linear-gradient(145deg, #6366F1, #000)",
  },
  {
    image: "/RyanPFP.jpg",
    title: "Emma Garcia",
    subtitle: "Project Manager",
    handle: "@emmagarcia",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(145deg, #F59E0B, #000)",
  },
  {
    image: "https://i.pravatar.cc/300?img=6",
    title: "Noah Williams",
    subtitle: "IT Specialist",
    handle: "@noahwilliams",
    borderColor: "#EC4899",
    gradient: "linear-gradient(145deg, #EC4899, #000)",
  },
  {
    image: "https://i.pravatar.cc/300?img=7",
    title: "Olivia Brown",
    subtitle: "QA Engineer",
    handle: "@oliviabrown",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(145deg, #8B5CF6, #000)",
  },
  {
    image: "https://i.pravatar.cc/300?img=8",
    title: "James Smith",
    subtitle: "Support Analyst",
    handle: "@jamessmith",
    borderColor: "#F97316",
    gradient: "linear-gradient(145deg, #F97316, #000)",
  },
  {
    image: "https://i.pravatar.cc/300?img=9",
    title: "Emily Davis",
    subtitle: "Helpdesk Technician",
    handle: "@emilydavis",
    borderColor: "#84CC16",
    gradient: "linear-gradient(145deg, #84CC16, #000)",
  }
];

export default function TeamGrid() {
  return (
    <div style={{ position: 'relative', backgroundColor: '#0f0f0f', padding: '40px' }}>
      
      

      {/* 👤 Profile cards */}
      <ChromaGrid 
        items={items}
        radius={300}
        damping={0.45}
        fadeOut={0.6}
        ease="power3.out"
        imageStyle={{
          width: '100%',
          height: '270px',
          objectFit: 'cover',
          aspectRatio: '3 / 4'
        }}
      />
    </div>
  );
}
