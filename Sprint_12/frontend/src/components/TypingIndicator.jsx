function TypingIndicator({ typingUser }) {
  return (
    <div className="typing-bar">
      {typingUser && (
        <div className="typing-content">
          <span>{typingUser} is typing</span>
          <span className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      )}
    </div>
  );
}

export default TypingIndicator;
