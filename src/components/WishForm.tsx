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
    <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-inner mb-8">
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <MessageSquareHeart className="w-5 h-5 text-red-500" />
        <span>Leave Your Birthday Message</span>
      </h2>

      {/* Validation Error Message */}
      {errorMessage && (
        <div 
          id="form-error-alert"
          role="alert"
          className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2.5 text-sm font-medium animate-shake"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
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
            className="block text-sm font-semibold text-slate-700 mb-1.5"
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="Visitor_Name"
              name="Visitor_Name"
              required
              value={visitorName}
              onChange={handleNameChange}
              placeholder="e.g. Rahul Sharma, Sneha, Aarav..."
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 text-sm transition-colors"
            />
          </div>
        </div>

        {/* TEXT_AREA: 'Wish_Message' */}
        <div>
          <label 
            htmlFor="Wish_Message" 
            className="block text-sm font-semibold text-slate-700 mb-1.5"
          >
            Your Birthday Wish <span className="text-red-500">*</span>
          </label>
          <textarea
            id="Wish_Message"
            name="Wish_Message"
            required
            rows={3}
            value={wishMessage}
            onChange={handleMessageChange}
            placeholder="Write a sweet, memorable birthday wish for Lalee Patel..."
            className="block w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 text-sm transition-colors resize-y min-h-[90px]"
          />
        </div>

        {/* BUTTON: 'Submit_Wish' */}
        {/* SECTION 2 Rule: Red color, white text, jumps slightly when hovered */}
        <div className="pt-1 flex justify-end">
          <button
            type="submit"
            id="Submit_Wish"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
          >
            <span>Post Wish</span>
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </div>
  );
}
