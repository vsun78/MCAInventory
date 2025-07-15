import React from 'react';
import ChromaGrid from './ChromaGrid';

const items = [
  {
    image: "/VictorPFP.jpg",
    title: "Victor Sun",
    subtitle: "IT Intern",
    handle: "victorsun@mcasphalt.com",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
  },
  {
    image: "/AngelPFP.jpg",
    title: "Angel Yang",
    subtitle: "IT Service Desk Assitant",
    handle: "angel.yang@mcasphalt.com",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
  },
  {
    image: "/BalaAvatar.jpg",
    title: "Balasubramaniam Balamugunthan",
    subtitle: "Technical Support Analyst",
    handle: "balab@colasiss.com",
    borderColor: "#EF4444",
    gradient: "linear-gradient(135deg, #EF4444, #000)",
  },
  {
    image: "/JenPFP.jpg",
    title: "Jennifer Su-Cao",
    subtitle: "IT Service Desk Assitant",
    handle: "jennifer.sucao@mcasphalt.com",
    borderColor: "#6366F1",
    gradient: "linear-gradient(145deg, #6366F1, #000)",
  },
  {
    image: "/RyanPFP.jpg",
    title: "Ryan Duncan",
    subtitle: "Technical Support Analyst",
    handle: "rduncan@colasiss.com",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(145deg, #F59E0B, #000)",
  },
  {
    image: "https://images.squarespace-cdn.com/content/v1/5723ca6bb6aa606f7895622e/1673027115596-USFMKHRYWLCV9IFQJ82Q/DSC08174-resized.jpeg?format=1500w",
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
