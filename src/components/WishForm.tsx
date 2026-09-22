import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Send, User, MessageSquareHeart, AlertCircle } from 'lucide-react';

interface WishFormProps {
  onAddWish: (name: string, message: string) => void;
}

export function WishForm({ onAddWish }: WishFormProps) {
  const [visitorName, setVisitorName] = useState('');
  const [wishMessage, setWishMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // PREVENT default page reload
    e.preventDefault();

    // 1. Data Extract Karna
    const name = visitorName.trim();
    const message = wishMessage.trim();

    // 2. Data Validation (Check karna ki khali toh nahi hai)
    if (!name || !message) {
      setErrorMessage('Please fill all fields');
      return;
    }

    // Clear error
    setErrorMessage(null);

    // 3 & 4. Pass to parent to create card and insert at TOP of Wishes_List
    onAddWish(name, message);

    // 5. Form Reset
    setVisitorName('');
    setWishMessage('');
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisitorName(e.target.value);
    if (errorMessage) setErrorMessage(null);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setWishMessage(e.target.value);
    if (errorMessage) setErrorMessage(null);
  };

  return (
    <div className="bg-pink-950/75 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-pink-400/40 shadow-2xl mb-6 text-white">
      <h2 className="text-lg font-bold text-pink-100 mb-4 flex items-center gap-2">
        <MessageSquareHeart className="w-5 h-5 text-pink-400" />
        <span>Leave Your Birthday Wish for Lalee</span>
      </h2>

      {/* Validation Error Message */}
      {errorMessage && (
        <div 
          id="form-error-alert"
          role="alert"
          className="mb-4 p-3.5 bg-rose-950/80 border border-rose-500 text-rose-200 rounded-xl flex items-center gap-2.5 text-sm font-medium animate-shake"
        >
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form 
        id="Input_Form" 
        onSubmit={handleSubmit} 
        noValidate 
        className="space-y-4"
      >
        {/* INPUT_FIELD: 'Visitor_Name' */}
        <div>
          <label 
            htmlFor="Visitor_Name" 
            className="block text-sm font-semibold text-pink-200 mb-1.5"
          >
            Your Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-300/70">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="Visitor_Name"
              name="Visitor_Name"
              required
              value={visitorName}
              onChange={handleNameChange}
              placeholder="e.g. Rahul Sharma, Sneha, Bestie..."
              className="block w-full pl-10 pr-4 py-2.5 bg-pink-900/40 border border-pink-400/40 rounded-xl text-white placeholder-pink-300/40 focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:border-pink-300 text-sm transition-colors"
            />
          </div>
        </div>

        {/* TEXT_AREA: 'Wish_Message' */}
        <div>
          <label 
            htmlFor="Wish_Message" 
            className="block text-sm font-semibold text-pink-200 mb-1.5"
          >
            Your Birthday Wish <span className="text-rose-400">*</span>
          </label>
          <textarea
            id="Wish_Message"
            name="Wish_Message"
            required
            rows={3}
            value={wishMessage}
            onChange={handleMessageChange}
            placeholder="Write a heartfelt birthday wish for Lalee (Miss Chai)..."
            className="block w-full p-3 bg-pink-900/40 border border-pink-400/40 rounded-xl text-white placeholder-pink-300/40 focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:border-pink-300 text-sm transition-colors resize-y min-h-[90px]"
          />
        </div>

        {/* BUTTON: 'Submit_Wish' */}
        <div className="pt-1 flex justify-end">
          <button
            type="submit"
            id="Submit_Wish"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-400 text-white font-bold rounded-xl shadow-lg shadow-pink-600/40 hover:shadow-pink-500/60 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
          >
            <span>Post Wish ✨</span>
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </div>
  );
}
