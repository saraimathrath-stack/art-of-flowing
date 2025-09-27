import React, { useState, useEffect } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import { getChakraIcon } from "../components/ChakraIcons";
import "./ChakraDeepDive.css";

interface ChakraData {
  id: string;
  name: string;
  sanskritName: string;
  symbol: string;
  location: string;
  theme: string;
  color: string;
  element: string;
  affirmation: string;
  description: string;
  light: {
    qualities: string[];
    strengths: string[];
  };
  shadow: {
    qualities: string[];
    imbalances: string[];
  };
  challenges: {
    micro: string;
    daily: string;
    deep: string;
  };
  journalPrompts: string[];
}

const chakraData: ChakraData[] = [
  {
    id: "root",
    name: "Root Chakra",
    sanskritName: "Muladhara",
    symbol: "🌺",
    location: "Base of spine",
    theme: "Safety, survival, grounding",
    color: "#B22222",
    element: "Earth",
    affirmation: "I am rooted, safe, and secure.",
    description: "The foundation of your being, connecting you to the Earth and providing a sense of safety and security in the physical world.",
    light: {
      qualities: ["Stability", "Trust in life", "Connection to Earth"],
      strengths: ["Healthy relationship with money", "Strong body awareness", "Clear boundaries"]
    },
    shadow: {
      qualities: ["Fear", "Anxiety", "Scarcity mindset"],
      imbalances: ["Feeling ungrounded", "Hoarding tendencies", "Obsession with material safety"]
    },
    challenges: {
      micro: "Each morning, repeat: I am safe, I trust life.",
      daily: "Spend one day barefoot in nature and notice how your body responds.",
      deep: "Practice grounding meditation, root-body movement, and conscious budgeting exercises."
    },
    journalPrompts: [
      "Where in my life do I feel unsafe or ungrounded?",
      "What does safety mean to me beyond money and survival?",
      "How can I bring more grounding rituals into my daily life?"
    ]
  },
  {
    id: "sacral",
    name: "Sacral Chakra",
    sanskritName: "Svadhisthana",
    symbol: "🌊",
    location: "Lower abdomen",
    theme: "Creativity, sexuality, emotions",
    color: "#FF8C00",
    element: "Water",
    affirmation: "I am creative, passionate, and emotionally balanced.",
    description: "The center of your creativity, emotions, and sensual energy, governing your relationship with pleasure and self-expression.",
    light: {
      qualities: ["Creativity", "Emotional balance", "Healthy sexuality"],
      strengths: ["Artistic expression", "Intimate relationships", "Joyful living"]
    },
    shadow: {
      qualities: ["Emotional instability", "Creative blocks", "Sexual shame"],
      imbalances: ["Addiction to pleasure", "Emotional numbness", "Fear of intimacy"]
    },
    challenges: {
      micro: "Each day, do one creative act for pure joy.",
      daily: "Spend time near water and notice your emotional responses.",
      deep: "Explore your relationship with pleasure through conscious movement and creative expression."
    },
    journalPrompts: [
      "What brings me pure joy and pleasure?",
      "How do I express my creativity in daily life?",
      "What emotions am I afraid to feel or express?"
    ]
  },
  {
    id: "solar",
    name: "Solar Plexus Chakra",
    sanskritName: "Manipura",
    symbol: "☀️",
    location: "Upper abdomen",
    theme: "Personal power, confidence, will",
    color: "#FFD700",
    element: "Fire",
    affirmation: "I am confident, powerful, and authentic.",
    description: "Your personal power center, governing self-esteem, confidence, and your ability to take action in the world.",
    light: {
      qualities: ["Confidence", "Personal power", "Authentic self"],
      strengths: ["Strong will", "Leadership", "Healthy boundaries"]
    },
    shadow: {
      qualities: ["Low self-esteem", "Power struggles", "Control issues"],
      imbalances: ["Aggression", "Passivity", "Perfectionism"]
    },
    challenges: {
      micro: "Each morning, stand tall and say: I am powerful and worthy.",
      daily: "Take one action that scares you but aligns with your values.",
      deep: "Practice setting healthy boundaries and claiming your authentic power."
    },
    journalPrompts: [
      "Where do I feel most powerful and confident?",
      "What fears hold me back from claiming my power?",
      "How can I honor my authentic self more fully?"
    ]
  },
  {
    id: "heart",
    name: "Heart Chakra",
    sanskritName: "Anahata",
    symbol: "💚",
    location: "Center of chest",
    theme: "Love, compassion, connection",
    color: "#32CD32",
    element: "Air",
    affirmation: "I am love, I give love, I receive love.",
    description: "The bridge between physical and spiritual, governing love, compassion, and your connection to others and yourself.",
    light: {
      qualities: ["Unconditional love", "Compassion", "Forgiveness"],
      strengths: ["Deep relationships", "Self-love", "Healing others"]
    },
    shadow: {
      qualities: ["Resentment", "Jealousy", "Self-criticism"],
      imbalances: ["Codependency", "Emotional walls", "Fear of intimacy"]
    },
    challenges: {
      micro: "Each day, send love to someone who has hurt you.",
      daily: "Practice heart-opening yoga or breathing exercises.",
      deep: "Explore forgiveness work and opening your heart to receive love."
    },
    journalPrompts: [
      "How do I show love to myself and others?",
      "What walls have I built around my heart?",
      "How can I practice more self-compassion?"
    ]
  },
  {
    id: "throat",
    name: "Throat Chakra",
    sanskritName: "Vishuddha",
    symbol: "🔮",
    location: "Throat",
    theme: "Communication, truth, expression",
    color: "#4169E1",
    element: "Ether",
    affirmation: "I speak my truth with clarity and love.",
    description: "Your center of communication and authentic expression, governing how you speak your truth and listen to others.",
    light: {
      qualities: ["Clear communication", "Authentic expression", "Active listening"],
      strengths: ["Public speaking", "Creative writing", "Honest relationships"]
    },
    shadow: {
      qualities: ["Fear of speaking", "Gossip", "Lying"],
      imbalances: ["Over-talking", "Silence", "Throat tension"]
    },
    challenges: {
      micro: "Each day, speak one truth you've been holding back.",
      daily: "Practice conscious communication in all your interactions.",
      deep: "Explore your authentic voice through writing, singing, or public speaking."
    },
    journalPrompts: [
      "What truths am I afraid to speak?",
      "How do I communicate my needs and boundaries?",
      "What would I say if I had no fear of judgment?"
    ]
  },
  {
    id: "third-eye",
    name: "Third Eye Chakra",
    sanskritName: "Ajna",
    symbol: "👁️",
    location: "Forehead",
    theme: "Intuition, insight, wisdom",
    color: "#8A2BE2",
    element: "Light",
    affirmation: "I trust my inner wisdom and see clearly.",
    description: "Your center of intuition and inner vision, governing your ability to see beyond the physical and trust your inner knowing.",
    light: {
      qualities: ["Intuition", "Inner wisdom", "Clear vision"],
      strengths: ["Psychic abilities", "Dream work", "Spiritual insight"]
    },
    shadow: {
      qualities: ["Overthinking", "Doubt", "Illusion"],
      imbalances: ["Headaches", "Confusion", "Disconnection from intuition"]
    },
    challenges: {
      micro: "Each day, pause and ask: What does my intuition tell me?",
      daily: "Practice meditation or mindfulness to quiet the mind.",
      deep: "Explore your dreams, develop your intuition, and trust your inner guidance."
    },
    journalPrompts: [
      "What does my intuition tell me about my current path?",
      "How do I distinguish between fear and intuition?",
      "What visions or dreams guide my life?"
    ]
  },
  {
    id: "crown",
    name: "Crown Chakra",
    sanskritName: "Sahasrara",
    symbol: "👑",
    location: "Top of head",
    theme: "Spirituality, connection, enlightenment",
    color: "#9370DB",
    element: "Thought",
    affirmation: "I am connected to the divine and all that is.",
    description: "Your connection to the divine and universal consciousness, governing your spiritual awareness and sense of oneness.",
    light: {
      qualities: ["Spiritual connection", "Universal love", "Transcendence"],
      strengths: ["Meditation", "Spiritual wisdom", "Service to others"]
    },
    shadow: {
      qualities: ["Spiritual bypassing", "Disconnection", "Ego inflation"],
      imbalances: ["Headaches", "Spiritual materialism", "Fear of the unknown"]
    },
    challenges: {
      micro: "Each day, spend time in nature and feel your connection to all life.",
      daily: "Practice gratitude for the mystery and beauty of existence.",
      deep: "Explore your spiritual path through meditation, prayer, or service."
    },
    journalPrompts: [
      "What does spirituality mean to me?",
      "How do I connect with something greater than myself?",
      "What is my purpose in this lifetime?"
    ]
  }
];

type TabType = "overview" | "shadow-light" | "challenges" | "journal";

export const ChakraDeepDive: React.FC = () => {
  const [currentChakra, setCurrentChakra] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [shadowLightMode, setShadowLightMode] = useState<"light" | "shadow">("light");
  const [journalEntries, setJournalEntries] = useState<{[key: string]: string}>(
    loadFromLocalStorage("chakra-journal", {})
  );
  const [completedChallenges, setCompletedChallenges] = useState<{[key: string]: boolean[]}>(
    loadFromLocalStorage("chakra-challenges", {})
  );
  const [moodSlider, setMoodSlider] = useState<{[key: string]: number}>(
    loadFromLocalStorage("chakra-mood", {})
  );
  const [customBackgrounds, setCustomBackgrounds] = useState<{[key: string]: string}>(
    loadFromLocalStorage("chakra-backgrounds", {})
  );
  const [showBackgroundUpload, setShowBackgroundUpload] = useState(false);

  const chakra = chakraData[currentChakra];

  // Auto-save data
  useEffect(() => {
    saveToLocalStorage("chakra-journal", journalEntries);
  }, [journalEntries]);

  useEffect(() => {
    saveToLocalStorage("chakra-challenges", completedChallenges);
  }, [completedChallenges]);

  useEffect(() => {
    saveToLocalStorage("chakra-mood", moodSlider);
  }, [moodSlider]);

  useEffect(() => {
    saveToLocalStorage("chakra-backgrounds", customBackgrounds);
  }, [customBackgrounds]);

  const handleJournalChange = (promptIndex: number, value: string) => {
    const key = `${chakra.id}-prompt-${promptIndex}`;
    setJournalEntries(prev => ({ ...prev, [key]: value }));
  };

  const handleChallengeToggle = (challengeType: "micro" | "daily" | "deep") => {
    const challengeIndex = challengeType === "micro" ? 0 : challengeType === "daily" ? 1 : 2;
    const key = `${chakra.id}-challenges`;
    setCompletedChallenges(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || [false, false, false]),
        [challengeIndex]: !(prev[key]?.[challengeIndex] || false)
      }
    }));
  };

  const getJournalEntry = (promptIndex: number) => {
    const key = `${chakra.id}-prompt-${promptIndex}`;
    return journalEntries[key] || "";
  };

  const getMoodValue = () => {
    return moodSlider[chakra.id] || 50;
  };

  const handleMoodChange = (value: number) => {
    setMoodSlider(prev => ({ ...prev, [chakra.id]: value }));
  };

  const getChallengeStatus = (challengeType: "micro" | "daily" | "deep") => {
    const challengeIndex = challengeType === "micro" ? 0 : challengeType === "daily" ? 1 : 2;
    const key = `${chakra.id}-challenges`;
    return completedChallenges[key]?.[challengeIndex] || false;
  };

  const getMoodLabel = (value: number) => {
    if (value < 20) return "Blocked";
    if (value < 40) return "Struggling";
    if (value < 60) return "Neutral";
    if (value < 80) return "Flowing";
    return "Radiant";
  };

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomBackgrounds(prev => ({ ...prev, [chakra.id]: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCustomBackground = () => {
    setCustomBackgrounds(prev => {
      const newBackgrounds = { ...prev };
      delete newBackgrounds[chakra.id];
      return newBackgrounds;
    });
  };

  const getBackgroundStyle = () => {
    const customBg = customBackgrounds[chakra.id];
    if (customBg) {
      return {
        backgroundImage: `url(${customBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    
    // Default chakra-specific gradients
    const gradients = {
      root: 'linear-gradient(135deg, #B22222 0%, #8B0000 50%, #2F1B14 100%)',
      sacral: 'linear-gradient(135deg, #FF8C00 0%, #FF4500 50%, #8B4513 100%)',
      solar: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #B8860B 100%)',
      heart: 'linear-gradient(135deg, #32CD32 0%, #228B22 50%, #006400 100%)',
      throat: 'linear-gradient(135deg, #4169E1 0%, #0000CD 50%, #191970 100%)',
      'third-eye': 'linear-gradient(135deg, #8A2BE2 0%, #4B0082 50%, #2F1B69 100%)',
      crown: 'linear-gradient(135deg, #9370DB 0%, #663399 50%, #4B0082 100%)'
    };
    
    return {
      background: gradients[chakra.id as keyof typeof gradients] || gradients.root
    };
  };

  return (
    <main className="chakra-deep-dive" style={getBackgroundStyle()}>
      {/* Background Upload Controls */}
      <div className="background-controls">
        <button 
          className="bg-upload-btn"
          onClick={() => setShowBackgroundUpload(!showBackgroundUpload)}
        >
          🎨 Custom Background
        </button>
        {customBackgrounds[chakra.id] && (
          <button 
            className="bg-remove-btn"
            onClick={removeCustomBackground}
          >
            🗑️ Remove Custom
          </button>
        )}
        {showBackgroundUpload && (
          <div className="bg-upload-panel">
            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
              className="bg-file-input"
            />
            <p>Upload a custom background image for this chakra</p>
          </div>
        )}
      </div>

      {/* Header */}
      <header className="chakra-header">
        <div className="chakra-symbol">
          {getChakraIcon(chakra.id, 60)}
        </div>
        <div className="chakra-info">
          <h1 className="chakra-name">{chakra.name}</h1>
          <h2 className="chakra-sanskrit">{chakra.sanskritName}</h2>
          <p className="chakra-theme">{chakra.theme}</p>
        </div>
        <div className="chakra-navigation">
          {chakraData.map((chakraItem, index) => (
            <button
              key={index}
              className={`chakra-nav-btn ${index === currentChakra ? 'active' : ''}`}
              onClick={() => setCurrentChakra(index)}
              style={{ backgroundColor: chakraItem.color }}
              title={chakraItem.name}
            >
              {getChakraIcon(chakraItem.id, 24)}
            </button>
          ))}
        </div>
      </header>

      {/* Tabs */}
      <nav className="chakra-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'shadow-light' ? 'active' : ''}`}
          onClick={() => setActiveTab('shadow-light')}
        >
          Shadow & Light
        </button>
        <button
          className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
          onClick={() => setActiveTab('challenges')}
        >
          Challenges & Practices
        </button>
        <button
          className={`tab-btn ${activeTab === 'journal' ? 'active' : ''}`}
          onClick={() => setActiveTab('journal')}
        >
          Interactive Journal
        </button>
      </nav>

      {/* Content */}
      <div className="chakra-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="chakra-card">
              <div className="card-header">
                <h3>Overview</h3>
                <div className="chakra-color" style={{ backgroundColor: chakra.color }}></div>
              </div>
              <div className="card-content">
                <div className="chakra-details">
                  <div className="detail-item">
                    <span className="label">Location:</span>
                    <span className="value">{chakra.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Element:</span>
                    <span className="value">{chakra.element}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Affirmation:</span>
                    <span className="value affirmation">"{chakra.affirmation}"</span>
                  </div>
                </div>
                <p className="chakra-description">{chakra.description}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shadow-light' && (
          <div className="shadow-light-section">
            <div className="mode-toggle">
              <button
                className={`mode-btn ${shadowLightMode === 'light' ? 'active' : ''}`}
                onClick={() => setShadowLightMode('light')}
              >
                ☀️ Light
              </button>
              <button
                className={`mode-btn ${shadowLightMode === 'shadow' ? 'active' : ''}`}
                onClick={() => setShadowLightMode('shadow')}
              >
                🌙 Shadow
              </button>
            </div>

            <div className="chakra-card">
              <div className="card-header">
                <h3>{shadowLightMode === 'light' ? 'Light Qualities' : 'Shadow Qualities'}</h3>
              </div>
              <div className="card-content">
                {shadowLightMode === 'light' ? (
                  <div>
                    <h4>Balanced Qualities:</h4>
                    <ul className="qualities-list">
                      {chakra.light.qualities.map((quality, index) => (
                        <li key={index}>{quality}</li>
                      ))}
                    </ul>
                    <h4>Strengths:</h4>
                    <ul className="qualities-list">
                      {chakra.light.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h4>Imbalanced Qualities:</h4>
                    <ul className="qualities-list">
                      {chakra.shadow.qualities.map((quality, index) => (
                        <li key={index}>{quality}</li>
                      ))}
                    </ul>
                    <h4>Common Imbalances:</h4>
                    <ul className="qualities-list">
                      {chakra.shadow.imbalances.map((imbalance, index) => (
                        <li key={index}>{imbalance}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="challenges-section">
            <div className="chakra-card">
              <div className="card-header">
                <h3>Challenges & Practices</h3>
              </div>
              <div className="card-content">
                <div className="challenge-levels">
                  <div className="challenge-item">
                    <div className="challenge-header">
                      <h4>🌱 Micro Challenge</h4>
                      <button
                        className={`challenge-btn ${getChallengeStatus('micro') ? 'completed' : ''}`}
                        onClick={() => handleChallengeToggle('micro')}
                      >
                        {getChallengeStatus('micro') ? '✅' : '⭕'}
                      </button>
                    </div>
                    <p className="challenge-text">{chakra.challenges.micro}</p>
                  </div>

                  <div className="challenge-item">
                    <div className="challenge-header">
                      <h4>🌿 Daily Challenge</h4>
                      <button
                        className={`challenge-btn ${getChallengeStatus('daily') ? 'completed' : ''}`}
                        onClick={() => handleChallengeToggle('daily')}
                      >
                        {getChallengeStatus('daily') ? '✅' : '⭕'}
                      </button>
                    </div>
                    <p className="challenge-text">{chakra.challenges.daily}</p>
                  </div>

                  <div className="challenge-item">
                    <div className="challenge-header">
                      <h4>🌳 Deep Practice</h4>
                      <button
                        className={`challenge-btn ${getChallengeStatus('deep') ? 'completed' : ''}`}
                        onClick={() => handleChallengeToggle('deep')}
                      >
                        {getChallengeStatus('deep') ? '✅' : '⭕'}
                      </button>
                    </div>
                    <p className="challenge-text">{chakra.challenges.deep}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="journal-section">
            <div className="chakra-card">
              <div className="card-header">
                <h3>Interactive Journal</h3>
              </div>
              <div className="card-content">
                <div className="mood-tracker">
                  <h4>Current Energy Level</h4>
                  <div className="mood-slider-container">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={getMoodValue()}
                      onChange={(e) => handleMoodChange(Number(e.target.value))}
                      className="mood-slider"
                      style={{ background: `linear-gradient(to right, #ff6b6b 0%, #ffd93d 50%, #6bcf7f 100%)` }}
                    />
                    <div className="mood-labels">
                      <span>Blocked</span>
                      <span className="current-mood">{getMoodLabel(getMoodValue())}</span>
                      <span>Radiant</span>
                    </div>
                  </div>
                </div>

                <div className="journal-prompts">
                  {chakra.journalPrompts.map((prompt, index) => (
                    <div key={index} className="prompt-item">
                      <h4>Prompt {index + 1}:</h4>
                      <p className="prompt-text">{prompt}</p>
                      <textarea
                        value={getJournalEntry(index)}
                        onChange={(e) => handleJournalChange(index, e.target.value)}
                        placeholder="Reflect on this prompt..."
                        className="journal-textarea"
                        rows={4}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
