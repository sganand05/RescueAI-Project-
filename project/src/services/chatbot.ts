interface ChatbotResponse {
  text: string;
  type: 'info' | 'emergency' | 'instruction';
}

const EMERGENCY_KEYWORDS = [
  'fire', 'flood', 'earthquake', 'medical', 'injury', 'hurt', 'help',
  'emergency', 'disaster', 'accident', 'danger', 'trapped', 'bleeding'
];

const EMERGENCY_RESPONSES: Record<string, ChatbotResponse[]> = {
  fire: [
    {
      type: 'emergency',
      text: 'If you\'re reporting a fire emergency, please: \n1. Evacuate immediately\n2. Call emergency services (911)\n3. Stay low to avoid smoke'
    },
    {
      type: 'instruction',
      text: 'Would you like me to help you report this fire emergency through our system?'
    }
  ],
  flood: [
    {
      type: 'emergency',
      text: 'For flood situations:\n1. Move to higher ground\n2. Avoid walking/driving through flood waters\n3. Listen to emergency broadcasts'
    },
    {
      type: 'instruction',
      text: 'I can help you request emergency assistance or resources. Would you like to proceed?'
    }
  ],
  medical: [
    {
      type: 'emergency',
      text: 'For medical emergencies:\n1. Call emergency services immediately\n2. Stay with the patient\n3. Follow emergency operator instructions'
    },
    {
      type: 'instruction',
      text: 'Do you need help requesting medical assistance through our platform?'
    }
  ],
  earthquake: [
    {
      type: 'emergency',
      text: 'During an earthquake:\n1. Drop, Cover, and Hold On\n2. Stay away from windows\n3. Be prepared for aftershocks'
    },
    {
      type: 'instruction',
      text: 'Would you like information about emergency resources in your area?'
    }
  ],
  general: [
    {
      type: 'info',
      text: 'I can help you with:\n- Reporting emergencies\n- Requesting resources\n- Finding emergency contacts\n- Getting safety instructions'
    }
  ]
};

export const generateResponse = (input: string): ChatbotResponse[] => {
  const lowercaseInput = input.toLowerCase();
  
  // Check for emergency keywords
  for (const keyword of EMERGENCY_KEYWORDS) {
    if (lowercaseInput.includes(keyword)) {
      if (EMERGENCY_RESPONSES[keyword]) {
        return EMERGENCY_RESPONSES[keyword];
      }
      // If no specific response, return general emergency response
      return EMERGENCY_RESPONSES.general;
    }
  }

  // Default response
  return [{
    type: 'info',
    text: "I'm here to help with emergency-related questions. You can ask about:\n- Emergency procedures\n- Resource requests\n- Emergency contacts\n- Safety guidelines"
  }];
};