import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import CircleIcon from '@mui/icons-material/Circle';
import PersonIcon from '@mui/icons-material/Person';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

const MessagePage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      lastMessage: 'Thanks for the payment confirmation!',
      timestamp: '2 min ago',
      unreadCount: 2,
      isOnline: true,
      messages: [
        { id: '1', text: 'Hi there! I just sent the payment for the project.', sender: 'other', timestamp: '10:30 AM', status: 'read' },
        { id: '2', text: 'Thanks for the payment confirmation!', sender: 'other', timestamp: '10:32 AM', status: 'read' },
        { id: '3', text: 'You\'re welcome! The project is progressing well.', sender: 'user', timestamp: '10:35 AM', status: 'read' },
        { id: '4', text: 'Can you send me the latest updates?', sender: 'other', timestamp: '2 min ago', status: 'delivered' },
        { id: '5', text: 'Sure, I\'ll share the progress report.', sender: 'other', timestamp: '1 min ago', status: 'sent' }
      ]
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      lastMessage: 'The invoice has been processed.',
      timestamp: '1 hour ago',
      unreadCount: 0,
      isOnline: false,
      messages: [
        { id: '1', text: 'Hi Mike, I\'ve sent the invoice for the consulting work.', sender: 'user', timestamp: '9:15 AM', status: 'read' },
        { id: '2', text: 'The invoice has been processed.', sender: 'other', timestamp: '1 hour ago', status: 'read' }
      ]
    },
    {
      id: '3',
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      lastMessage: 'Looking forward to our meeting tomorrow!',
      timestamp: '3 hours ago',
      unreadCount: 1,
      isOnline: true,
      messages: [
        { id: '1', text: 'Hi Emily, are we still on for tomorrow\'s meeting?', sender: 'user', timestamp: '8:00 AM', status: 'read' },
        { id: '2', text: 'Looking forward to our meeting tomorrow!', sender: 'other', timestamp: '3 hours ago', status: 'delivered' }
      ]
    },
    {
      id: '4',
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      lastMessage: 'The budget looks good to me.',
      timestamp: '1 day ago',
      unreadCount: 0,
      isOnline: false,
      messages: [
        { id: '1', text: 'David, I\'ve updated the budget proposal.', sender: 'user', timestamp: 'Yesterday', status: 'read' },
        { id: '2', text: 'The budget looks good to me.', sender: 'other', timestamp: '1 day ago', status: 'read' }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, you would send this to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-2xl font-bold tracking-tight mb-4 bg-gradient-to-r from-accent-green to-accent-yellow bg-clip-text text-transparent drop-shadow-lg">
        Messages
      </div>

      <div className="bg-bg-card rounded-xl shadow-md border border-accent-green/20 overflow-hidden">
        <div className="flex h-[600px]">
          {/* Conversation List */}
          <div className="w-1/3 border-r border-border-dark bg-bg-sidebar">
            {/* Search */}
            <div className="p-4 border-b border-border-dark">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-bg-main border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="overflow-y-auto h-[calc(600px-80px)]">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 cursor-pointer hover:bg-bg-main transition-colors border-b border-border-dark ${
                    selectedConversation === conversation.id ? 'bg-bg-main' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.isOnline && (
                        <CircleIcon className="absolute -bottom-1 -right-1 text-accent-green w-4 h-4 bg-bg-sidebar rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-text-main truncate">{conversation.name}</h3>
                        <span className="text-xs text-text-muted">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-text-muted truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="bg-accent-green text-bg-main text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border-dark bg-bg-main">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={currentConversation.avatar}
                          alt={currentConversation.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {currentConversation.isOnline && (
                          <CircleIcon className="absolute -bottom-1 -right-1 text-accent-green w-3 h-3 bg-bg-main rounded-full" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-main">{currentConversation.name}</h3>
                        <p className="text-sm text-text-muted">
                          {currentConversation.isOnline ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-bg-card rounded-lg transition-colors">
                      <MoreVertIcon className="text-text-muted" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-main">
                  {currentConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-accent-green text-bg-main'
                            : 'bg-bg-card text-text-main'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div className={`flex items-center justify-between mt-1 text-xs ${
                          message.sender === 'user' ? 'text-bg-main/70' : 'text-text-muted'
                        }`}>
                          <span>{message.timestamp}</span>
                          {message.sender === 'user' && (
                            <span className="ml-2">
                              {message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓✓' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border-dark bg-bg-main">
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-bg-card rounded-lg transition-colors">
                      <AttachFileIcon className="text-text-muted" />
                    </button>
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        rows={1}
                        className="w-full px-4 py-2 bg-bg-card border border-border-dark rounded-lg text-text-main focus:outline-none focus:ring-2 focus:ring-accent-green resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-2 bg-accent-green text-bg-main rounded-lg hover:bg-accent-green/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <SendIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-bg-main">
                <div className="text-center">
                  <PersonIcon className="w-16 h-16 text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-main mb-2">Select a conversation</h3>
                  <p className="text-text-muted">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage; 