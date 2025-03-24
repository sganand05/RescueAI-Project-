import React, { useEffect, useState } from 'react';
import { BookOpen, AlertCircle, ExternalLink } from 'lucide-react';

interface Guideline {
  id: number;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  articleUrl: string;
}

const Guidelines = () => {
  const [guidelines, setGuidelines] = useState<Guideline[]>([
    {
      id: 1,
      title: "Earthquake Safety",
      description: "Drop, Cover, and Hold On. Stay away from windows and exterior walls. If inside, stay inside. If outside, stay outside.",
      category: "Natural Disasters",
      videoUrl: "https://www.youtube.com/watch?v=BLEPakj1YTY",
      articleUrl: "https://www.ready.gov/earthquakes"
    },
    {
      id: 2,
      title: "Fire Emergency",
      description: "Stop, Drop, and Roll if your clothes catch fire. Use stairs, not elevators. Feel doors for heat before opening.",
      category: "Fire Safety",
      videoUrl: "https://www.youtube.com/watch?v=7gHEtGY4chE",
      articleUrl: "https://www.nfpa.org/Public-Education/Staying-safe/Preparedness"
    },
    {
      id: 3,
      title: "Flood Preparation",
      description: "Move to higher ground. Never drive through flooded roads. Prepare an emergency kit with essential supplies.",
      category: "Natural Disasters",
      videoUrl: "https://www.youtube.com/watch?v=43M5mZuzHF8",
      articleUrl: "https://www.ready.gov/floods"
    },
    {
      id: 4,
      title: "Cyclone Preparedness",
      description: "Secure loose objects, stay indoors, and follow government advisories. Evacuate if instructed.",
      category: "Natural Disasters",
      videoUrl: "https://www.youtube.com/watch?v=Li1ysRexTY8",
      articleUrl: "https://www.ndma.gov.in/cyclone"
    },
    {
      id: 5,
      title: "Tsunami Safety",
      description: "Move to higher ground immediately. Follow evacuation routes and listen to emergency broadcasts.",
      category: "Natural Disasters",
      videoUrl: "https://www.youtube.com/watch?v=m7EDddq9ftQ",
      articleUrl: "https://www.tsunami.gov/"
    },
    {
      id: 6,
      title: "Nuclear Plant Disaster Safety",
      description: "Stay indoors, close windows, and follow official guidelines. Avoid contaminated food and water.",
      category: "Man-Made Disasters",
      videoUrl: "https://www.youtube.com/watch?v=al0CVsiffu8",
      articleUrl: "https://www.nrc.gov/about-nrc/emerg-preparedness.html"
    },
    {
      id: 7,
      title: "Drought Preparedness",
      description: "Conserve water, store essential supplies, and follow agricultural advisories.",
      category: "Natural Disasters",
      videoUrl: "https://www.youtube.com/watch?v=J5WMyD9-CHs",
      articleUrl: "https://www.fao.org/drought/en/"
    },
    {
      id: 8,
      title: "Landslide Safety",
      description: "Stay alert in hilly areas during heavy rains. Evacuate if early signs of landslides appear.",
      category: "Natural Disasters",
      videoUrl: "https://www.youtube.com/watch?v=kE3XAwR412I",
      articleUrl: "https://www.usgs.gov/natural-hazards/landslide-hazards/science"
    },
    {
      id: 9,
      title: "Forest Fire Safety",
      description: "Evacuate if required. Avoid breathing smoke and stay informed through alerts.",
      category: "Natural Disasters",
      videoUrl: "https://www.youtube.com/watch?v=_bNLtjHG9dM",
      articleUrl: "https://www.readyforwildfire.org/"
    }
  ]);

  useEffect(() => {
    // Here you would typically fetch guidelines from an API
    // For now, we're using static data
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BookOpen className="h-8 w-8 text-red-600 mr-3" />
            Disaster Preparedness Guidelines
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guidelines.map((guideline) => (
            <div
              key={guideline.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
                <h2 className="text-xl font-semibold">{guideline.title}</h2>
              </div>
              <span className="inline-block bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full mb-4">
                {guideline.category}
              </span>
              <p className="text-gray-600">{guideline.description}</p>
              <button 
                onClick={() => {
                  window.open(guideline.videoUrl, '_blank');
                  window.open(guideline.articleUrl, '_blank');
                }}
                className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 active:bg-red-800 transition-colors"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
