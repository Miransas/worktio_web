/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Plus, Send, Trash2, Settings, Loader2, Bot,
  Wrench, ChevronDown, X, Globe, Code2, Mail, Zap, Globe2
} from "lucide-react";

type Agent = {
  id: string; name: string; model: string;
  systemPrompt: string; tools: string[];
};
type Message = {
  id: string; role: string; content: string;
  toolCall: any; createdAt: string;
};

const MODELS = [
  // { value: "gemini-pro", label: "Gemini Pro" },
  // { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
  // { value: "cloude-ops", label: "Gemini 1.5 Pro" },
  // {}
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
];

const TOOLS = [
  { id: "web_search", label: "Web Arama", icon: <Globe size={12} />, color: "text-blue-400" },
  { id: "code", label: "Kod Çalıştır", icon: <Code2 size={12} />, color: "text-rose-400" },
  { id: "gmail", label: "Gmail", icon: <Mail size={12} />, color: "text-red-400" },
  { id: "flow", label: "Flow Tetikle", icon: <Zap size={12} />, color: "text-amber-400" },
  { id: "http", label: "HTTP İstek", icon: <Globe2 size={12} />, color: "text-emerald-400" },
];

export default function AgentPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editAgent, setEditAgent] = useState<Agent | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch("/api/agents").then(r => r.json()).then(data => {
      setAgents(data);
      if (data.length > 0) selectAgent(data[0]);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectAgent = async (agent: Agent) => {
    setSelectedAgent(agent);
    setEditAgent({ ...agent });
    setShowSettings(false);
    const res = await fetch(`/api/agents/${agent.id}/chat`);
    const data = await res.json();
    setMessages(data);
  };

  const createAgent = async () => {
    setCreating(true);
    const res = await fetch("/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Yeni Agent" }),
    });
    const agent = await res.json();
    setAgents(a => [...a, agent]);
    selectAgent(agent);
    setCreating(false);
  };

  const deleteAgent = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await fetch(`/api/agents/${id}`, { method: "DELETE" });
    setAgents(a => a.filter(ag => ag.id !== id));
    if (selectedAgent?.id === id) { setSelectedAgent(null); setMessages([]); }
  };

  const saveSettings = async () => {
    if (!editAgent) return;
    const res = await fetch(`/api/agents/${editAgent.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editAgent),
    });
    const updated = await res.json();
    setSelectedAgent(updated);
    setAgents(a => a.map(ag => ag.id === updated.id ? updated : ag));
    setShowSettings(false);
  };

  const clearChat = async () => {
    if (!selectedAgent) return;
    await fetch(`/api/agents/${selectedAgent.id}/chat`, { method: "DELETE" });
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedAgent || sending) return;
    const userMsg = { id: Date.now().toString(), role: "user", content: input, toolCall: null, createdAt: new Date().toISOString() };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setSending(true);

    const res = await fetch(`/api/agents/${selectedAgent.id}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input }),
    });
    const data = await res.json();
    setMessages(m => [...m, data.message]);
    setSending(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const toggleTool = (toolId: string) => {
    if (!editAgent) return;
    const tools = editAgent.tools.includes(toolId)
      ? editAgent.tools.filter(t => t !== toolId)
      : [...editAgent.tools, toolId];
    setEditAgent({ ...editAgent, tools });
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sol: Agent listesi */}
      <aside className="w-60 border-r border-zinc-800 bg-[#0d0d0d] flex flex-col shrink-0">
        <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Agentlar</span>
          <button
            onClick={createAgent}
            disabled={creating}
            className="w-6 h-6 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
          >
            {creating ? <Loader2 size={12} className="animate-spin text-zinc-400" /> : <Plus size={12} className="text-zinc-400" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {agents.map(agent => (
            <div
              key={agent.id}
              onClick={() => selectAgent(agent)}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${selectedAgent?.id === agent.id
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Bot size={12} className="text-purple-400" />
                </div>
                <span className="text-sm font-medium truncate">{agent.name}</span>
              </div>
              <button
                onClick={e => deleteAgent(agent.id, e)}
                className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all shrink-0"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}

          {agents.length === 0 && (
            <div className="text-center py-8 text-zinc-600 text-xs">
              Agent yok, + ile ekle
            </div>
          )}
        </div>
      </aside>

      {/* Sağ: Chat alanı */}
      {selectedAgent ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="h-14 border-b border-zinc-800 px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Bot size={16} className="text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-200">{selectedAgent.name}</div>
                <div className="text-xs text-zinc-500 flex items-center gap-1.5">
                  <span>{MODELS.find(m => m.value === selectedAgent.model)?.label}</span>
                  {(selectedAgent.tools as string[]).length > 0 && (
                    <>
                      <span>·</span>
                      <Wrench size={10} />
                      <span>{(selectedAgent.tools as string[]).length} tool</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearChat} className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors" title="Sohbeti temizle">
                <Trash2 size={14} />
              </button>
              <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-lg transition-colors ${showSettings ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"}`}>
                <Settings size={14} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex min-h-0">
            {/* Mesajlar */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {messages.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                    <Bot size={32} className="text-purple-400" />
                  </div>
                  <p className="text-zinc-400 font-medium">{selectedAgent.name} hazır</p>
                  <p className="text-zinc-600 text-sm mt-1">Bir mesaj yaz ve sohbeti başlat</p>
                </div>
              )}

              {messages.filter(msg => msg && msg.role).map(msg => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-zinc-700" : "bg-purple-500/20"
                    }`}>
                    {msg.role === "user"
                      ? <span className="text-xs text-zinc-300">S</span>
                      : <Bot size={14} className="text-purple-400" />
                    }
                  </div>
                  <div className={`max-w-[75%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : ""}`}>
                    {/* Tool call göster */}
                    {msg.toolCall && Array.isArray(msg.toolCall) && msg.toolCall.length > 0 && (
                      <div className="flex flex-col gap-1 mb-1">
                        {msg.toolCall.map((tc: any, i: number) => (
                          <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs">
                            <Wrench size={10} className="text-amber-400 shrink-0" />
                            <span className="text-amber-400 font-mono">{tc.tool}</span>
                            <span className="text-zinc-500 truncate max-w-[200px]">{JSON.stringify(tc.args)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user"
                      ? "bg-purple-600 text-white rounded-tr-sm"
                      : "bg-zinc-800 text-zinc-200 rounded-tl-sm"
                      }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {sending && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Bot size={14} className="text-purple-400" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-zinc-800 flex items-center gap-1.5">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Ayarlar paneli */}
            {showSettings && editAgent && (
              <div className="w-72 border-l border-zinc-800 bg-[#0d0d0d] flex flex-col shrink-0 overflow-y-auto">
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-200">Agent Ayarları</span>
                  <button onClick={() => setShowSettings(false)} className="text-zinc-500 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
                <div className="p-4 flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">İsim</label>
                    <input
                      value={editAgent.name}
                      onChange={e => setEditAgent({ ...editAgent, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Model</label>
                    <select
                      value={editAgent.model}
                      onChange={e => setEditAgent({ ...editAgent, model: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
                    >
                      {MODELS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Sistem Prompt</label>
                    <textarea
                      value={editAgent.systemPrompt}
                      onChange={e => setEditAgent({ ...editAgent, systemPrompt: e.target.value })}
                      rows={5}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 resize-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-zinc-400 mb-2 block">Tool&rsquo;lar</label>
                    <div className="flex flex-col gap-1.5">
                      {TOOLS.map(tool => (
                        <label key={tool.id} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-zinc-600 transition-colors">
                          <input
                            type="checkbox"
                            checked={editAgent.tools.includes(tool.id)}
                            onChange={() => toggleTool(tool.id)}
                            className="accent-purple-500"
                          />
                          <span className={tool.color}>{tool.icon}</span>
                          <span className="text-xs text-zinc-300">{tool.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={saveSettings}
                    className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-zinc-800 shrink-0">
            <div className="flex gap-3 items-end bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 focus-within:border-purple-500 transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`${selectedAgent.name}'e mesaj yaz... (Enter gönder, Shift+Enter yeni satır)`}
                rows={1}
                className="flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none resize-none max-h-32"
                style={{ height: "auto" }}
                onInput={e => {
                  const t = e.target as HTMLTextAreaElement;
                  t.style.height = "auto";
                  t.style.height = Math.min(t.scrollHeight, 128) + "px";
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className="w-8 h-8 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
              >
                {sending ? <Loader2 size={14} className="animate-spin text-white" /> : <Send size={14} className="text-white" />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
              <Bot size={32} className="text-zinc-600" />
            </div>
            <p className="text-zinc-400">Sol taraftan bir agent seç</p>
            <p className="text-zinc-600 text-sm mt-1">veya + ile yeni agent oluştur</p>
          </div>
        </div>
      )}
    </div>
  );
}