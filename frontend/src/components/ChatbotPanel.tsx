import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, ImagePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  messages: Message[];
  sendMessage: (message: string, image?: File | null) => void;
  isAIEnabled: boolean;
  setIsAIEnabled: (enabled: boolean) => void;
  loading: boolean;
}

const ChatbotPanel: React.FC<ChatbotPanelProps> = ({
  isOpen,
  onToggle,
  messages,
  sendMessage,
  isAIEnabled,
  setIsAIEnabled,
  loading
}) => {
  const [inputValue, setInputValue] = useState('');
  const [uploadingImage, setUploadingImage] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && !uploadingImage) return;
    await sendMessage(inputValue, uploadingImage);
    setInputValue('');
    setUploadingImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadingImage(e.target.files[0]);
      setInputValue('');
    }
  };

  return (
    <>
      <motion.button
        onClick={onToggle}
        className="fixed bottom-8 right-6 w-16 h-16 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg z-60 flex items-center justify-center"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-screen w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col rounded-l-2xl overflow-hidden">
            <header className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-3">
                <Logo size="small" showText={false} />
                <div>
                  <h2 className="text-xl font-bold text-primary">DishTrad Assistant</h2>
                  <p className="text-sm text-gray-500">Cuisine camerounaise</p>
                </div>
              </div>
              <button onClick={onToggle}><X size={24} /></button>
            </header>

            <section className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map(({ id, text, imageUrl, isUser, timestamp }) => (
                <motion.div key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-lg px-4 py-3 max-w-[75%] ${isUser ? 'bg-primary text-white' : 'bg-gray-100 text-gray-900'}`}>
                    {text && <p>{text}</p>}
                    {imageUrl && <img src={imageUrl} alt="Envoyé" className="mt-2 max-h-48 rounded-md object-contain" />}
                    <span className="block text-xs mt-1 opacity-60 text-right">{timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </motion.div>
              ))}
              {loading && <div className="text-sm text-primary">Assistant écrit...</div>}
              <div ref={messagesEndRef} />
            </section>

            <form onSubmit={handleSendMessage} className="flex items-center gap-3 p-4 border-t">
              <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                placeholder="Écrivez un message..." disabled={loading} className="flex-1 rounded-md px-4 py-2 border" />

              <label htmlFor="chat-upload" className="cursor-pointer p-2">
                <ImagePlus size={24} />
              </label>
              <input type="file" accept="image/*" id="chat-upload" className="hidden" onChange={handleImageChange} disabled={loading} />

              <button type="submit" disabled={(inputValue.trim() === '' && !uploadingImage) || loading} className="bg-primary text-white px-4 py-2 rounded-md">
                <Send size={20} />
              </button>
            </form>

            {uploadingImage && (
              <div className="p-4 border-t bg-gray-50 flex items-center gap-3">
                <img src={URL.createObjectURL(uploadingImage)} alt="Aperçu" className="h-16 w-16 object-cover rounded-md" />
                <div className="flex-1"><p className="text-sm truncate">{uploadingImage.name}</p></div>
                <button onClick={() => setUploadingImage(null)} className="text-red-500"><X size={20} /></button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotPanel;