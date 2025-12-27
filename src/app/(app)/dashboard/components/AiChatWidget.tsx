"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AiChatWidgetSkeleton from "./AiChatWidgetSkeleton";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  message: string;
}

export default function AiChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      message: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/dashboard/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();

      const aiMessage: ChatMessage = {
        id: Date.now().toString() + "-ai",
        sender: "ai",
        message: data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("AI chat error", err);
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + "-ai",
        sender: "ai",
        message: "Failed to get AI response. Try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          AI Chat Assistant
        </Typography>

        {/* Messages */}
        {loading && messages.length === 0 ? (
          <AiChatWidgetSkeleton />
        ) : (
          <List sx={{ maxHeight: 200, overflowY: "auto" }}>
            {messages.map((msg) => (
              <ListItem key={msg.id}>
                <ListItemText
                  primary={msg.message}
                  primaryTypographyProps={{
                    align: msg.sender === "user" ? "right" : "left",
                    sx: { whiteSpace: "pre-wrap" },
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}

        {/* Input */}
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <IconButton color="primary" onClick={handleSend} disabled={loading}>
            {loading ? <CircularProgress size={18} /> : <SendIcon />}
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
