import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, ImagePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

interface Message {
  id: string;
  text?: string;
  imageUrl?: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatbotPanel: React.FC<ChatbotPanelProps> = ({ isOpen, onToggle }) => {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant culinaire DishTrad. Posez-moi vos questions sur les plats camerounais !',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll vers le bas quand messages changent
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus sur input quand on ouvre le panel
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Envoyer message (texte ou image)
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() && !uploadingImage) return;

    // Ajout message utilisateur (texte ou image)
    const userMessage: Message = {
      id: Date.now().toString(),
      isUser: true,
      timestamp: new Date(),
      text: inputValue.trim() || undefined,
      imageUrl: uploadingImage ? URL.createObjectURL(uploadingImage) : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setUploadingImage(null);
    setIsTyping(true);

    // Simule réponse chatbot
    setTimeout(() => {
      const responses = [
        "Le Ndolé est un plat traditionnel à base de feuilles amères et d'arachides. Voulez-vous la recette complète ?",
        "Le Poulet DG (Directeur Général) est un plat festif avec du plantain et des légumes. C'est délicieux !",
        "Pour préparer le Eru, il faut des feuilles d'okok et du poisson fumé. C'est un plat typique du Sud-Ouest.",
        "Le Koki est fait à partir de haricots pilés cuits à la vapeur dans des feuilles. C'est très nutritif !",
        "Excellent choix ! Ce plat se marie parfaitement avec du plantain bouilli ou du riz.",
        "Souhaitez-vous que je vous montre des restaurants près de chez vous qui servent ce plat ?"
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        isUser: false,
        timestamp: new Date(),
        text: responses[Math.floor(Math.random() * responses.length)]
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Upload image par input file
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Optionnel: filtrer taille, type etc.
      setUploadingImage(file);
      // Clear texte quand image chargée
      setInputValue('');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Bouton toggle flottant */}
      <motion.button
        onClick={onToggle}
        className="fixed bottom-8 right-6 w-16 h-16 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg z-60 flex items-center justify-center transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-primary/60"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Fermer le chatbot" : "Ouvrir le chatbot"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel chatbot */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay semi-transparent pour mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={onToggle}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-screen w-full md:w-96 bg-white dark:bg-gray-900 shadow-2xl border-l-4 border-primary z-50 flex flex-col rounded-l-2xl overflow-hidden"
            >
              {/* Header */}
              <header className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <Logo size="small" showText={false} />
                  <div>
                    <h2 className="font-noto-serif text-xl font-bold text-primary dark:text-primary-light">
                      DishTrad Assistant
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Cuisine camerounaise
                    </p>
                  </div>
                </div>
                <button
                  onClick={onToggle}
                  aria-label="Fermer le chatbot"
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <X size={24} className="text-gray-700 dark:text-gray-300" />
                </button>
              </header>

              {/* Messages */}
              <section
                className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200 dark:scrollbar-track-gray-800"
                aria-live="polite"
                aria-relevant="additions"
              >
                {messages.map(({ id, text, imageUrl, isUser, timestamp }) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-3 max-w-[75%] break-words
                        ${isUser
                          ? 'bg-primary text-white rounded-tr-none'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none'}
                      `}
                      style={{ wordBreak: 'break-word' }}
                    >
                      {text && <p className="whitespace-pre-wrap">{text}</p>}

                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt="Envoyé par l'utilisateur"
                          className="mt-2 max-h-48 rounded-md object-contain shadow-md"
                        />
                      )}

                      <span className="block text-xs mt-1 opacity-60 text-right select-none">
                        {timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 max-w-[60%] flex items-center gap-2">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-sm text-primary select-none">Assistant écrit...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </section>

              {/* Input + upload */}
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                {/* Input texte */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Écrivez un message..."
                  disabled={isTyping}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Message à envoyer"
                />

                {/* Upload image */}
                <label
                  htmlFor="chat-upload"
                  className="cursor-pointer p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  title="Envoyer une image"
                  aria-label="Envoyer une image"
                >
                  <ImagePlus size={24} className="text-primary" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="chat-upload"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isTyping}
                />

                {/* Bouton envoyer */}
                <button
                  type="submit"
                  disabled={(inputValue.trim() === '' && !uploadingImage) || isTyping}
                  className="bg-primary hover:bg-primary-dark text-white rounded-md px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  aria-label="Envoyer le message"
                >
                  <Send size={20} />
                </button>
              </form>

              {/* Aperçu image en upload */}
              {uploadingImage && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center gap-3">
                  <img
                    src={URL.createObjectURL(uploadingImage)}
                    alt="Image à envoyer"
                    className="h-16 w-16 object-cover rounded-md shadow"
                  />
                  <div className="flex-1">
                    <p className="text-sm truncate">{uploadingImage.name}</p>
                  </div>
                  <button
                    onClick={() => setUploadingImage(null)}
                    aria-label="Annuler l'envoi de l'image"
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotPanel;
