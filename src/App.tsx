/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Brain, 
  Bot, 
  Layers, 
  Printer, 
  Cpu, 
  BarChart3, 
  LineChart, 
  TrendingUp, 
  Briefcase, 
  ClipboardCheck, 
  ArrowRight, 
  Check, 
  X, 
  Globe, 
  Send, 
  Zap, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Phone
} from "lucide-react";

// Image path as a sturdy string constant to resolve TypeScript asset resolution constraints
const gorillaImg = new URL("./assets/images/monkey_labs_hero_1781183343710.jpg", import.meta.url).href;

// Configuration for easy editing
const WHATSAPP_PHONE = "5531989208462"; // Default workspace customization number (can be edited)
const DEFAULT_WHATSAPP_TEXTS = {
  pt: "Olá Monkey Labs! Gostaria de agendar meu Diagnóstico Gratuito para entender como as soluções de vocês podem impulsionar minha empresa.",
  es: "¡Hola Monkey Labs! Me gustaría agendar mi Diagnóstico Gratuito para entender cómo sus soluciones pueden impulsar mi empresa."
};

const TRANSLATIONS = {
  pt: {
    tagline: "Alta Performance Tecnológica",
    heroTitle: "Transformamos",
    heroHighlight: "ideias em resultados.",
    heroSubtitle: "Consultoria, Inteligência Artificial, Dashboards e Soluções Tecnológicas para empresas que desejam crescer com mais organização, produtividade e resultados.",
    btnDiagnostic: "Solicitar Diagnóstico Gratuito",
    btnSolutions: "Conhecer Soluções",
    metric1: "Projetos Entregues",
    metric2: "Áreas de Atuação",
    metric3: "Atendimento Brasil e Paraguai",
    solutionsTag: "Soluções Estratégicas",
    solutionsTitle: "Nossas Soluções",
    solutionsSubtitle: "Organizamos tecnologia, dados, inteligência artificial e prototipagem em quatro áreas estratégicas para acelerar o crescimento da sua empresa.",
    navConsulting: "Consultoria",
    navAi: "Sistemas IA",
    navData: "Dados",
    navMaker: "Hardware",
    talkToExpert: "FALAR COM ESPECIALISTA",
    diagnostic: "DIAGNÓSTICO",
    all: "Todas",
    consultingTab: "Consultoria",
    aiTab: "Inteligência Artificial",
    dataTab: "Inteligência de Dados",
    makerTab: "Engenharia & Prototipagem",
    
    // Cards
    cardConsultingLabel: "Consulting Hub",
    cardConsultingTitle: "🐒 Monkey Labs Consulting",
    cardConsultingDesc: "Análise profunda e reestruturação operacional. Identificamos vulnerabilidades processuais para traçar caminhos tecnológicos eficientes.",
    cardConsultingCheck1: "Consultoria em Tecnologia",
    cardConsultingCheck2: "Diagnóstico Empresarial Completo",
    cardConsultingCheck3: "Mapeamento de Processos",
    cardConsultingBottomLabel: "Para sua empresa",
    cardConsultingBottomTitle: "Mapeamento Sem Complicações",
    cardConsultingBtn: "Diagnóstico de Consultoria",

    cardAiLabel: "AI Agents Lab",
    cardAiTitle: "🐒 Monkey Labs AI",
    cardAiDesc: "Revolucione seu fluxo operacional com inteligências artificiais conversacionais e agentes autônomos integrados diretamente na sua API.",
    cardAiCheck1: "Inteligência Artificial Personalizada",
    cardAiCheck2: "Agentes de IA Construtivos",
    cardAiCheck3: "Automações Robotizadas de Chat & WhatsApp",
    cardAiBottomLabel: "Tecnologias GPT & Gemini",
    cardAiBottomTitle: "Substitua Retrabalho Manual",
    cardAiBtn: "Automação com IA",

    cardDataLabel: "Data Analytics",
    cardDataTitle: "🐒 Monkey Labs Data",
    cardDataDesc: "Transforme informações desconexas em inteligência de mercado estruturada. Rastreie métricas essenciais em tempo real sem planilhas complexas.",
    cardDataCheck1: "Dashboards Dinâmicos Integrados",
    cardDataCheck2: "Power BI & Custom Canvas Analytics",
    cardDataCheck3: "Inteligência de Dados e ETL Automatizado",
    cardDataBottomLabel: "Métricas Decisoras",
    cardDataBottomTitle: "Decisões Rápidas via Dados",
    cardDataBtn: "Dashboards Informativos",

    cardMakerLabel: "Rapid Prototyping",
    cardMakerTitle: "🐒 Monkey Labs Maker",
    cardMakerDesc: "Seu produto físico desenvolvido do zero. Engenharia reversa, mockups, design CAD 3D e produtos de alto acabamento sob medida.",
    cardMakerCheck1: "Impressão 3D de Alta Precisão",
    cardMakerCheck2: "Prototipagem Industrial e Mecânica",
    cardMakerCheck3: "Acessórios corporativos & Produtos Personalizados",
    cardMakerBottomLabel: "Hardware sob Demanda",
    cardMakerBottomTitle: "Prototipação em Poucos Dias",
    cardMakerBtn: "Solicitar Protótipo 3D",

    // Footer
    footerSlogan: "Menos planilhas. Menos retrabalho. Mais resultados.",
    footerCopyright: "© 2026 MONKEY LABS. Tecnologia • Inteligência Artificial • Dados • Prototipagem.",
    footerStatus: "Live Network Status",
    footerContact: "Contato Direto",

    // Modal
    modalTitle: "Diagnóstico Gratuito",
    modalSub: "Preencha as informações para direcionarmos o especialista ideal no WhatsApp.",
    labelSol: "Área de Interesse Principal *",
    labelName: "Seu Nome *",
    placeholderName: "Ex: Adilson Oliveira",
    labelCompany: "Sua Empresa (Opcional)",
    placeholderCompany: "Ex: Monkey Tech",
    labelWhatsapp: "Seu WhatsApp *",
    placeholderWhatsapp: "Ex: (45) 99144-8844",
    labelDesc: "Detalhe seu Desafio (Opcional)",
    placeholderDesc: "Ex: Preciso automatizar o atendimento dos meus clientes e integrar ao meu funil de vendas...",
    modalBtnSending: "Redirecionando para o WhatsApp...",
    modalBtnSend: "Enviar Solicitação via WhatsApp",
    modalTrust: "🔒 Seus dados serão utilizados apenas para construir o escopo de diagnóstico e iniciar seu contato.",
    
    // Select options inside select dropdown
    optConsulting: "Consultoria em Tecnologia & Processos",
    optAi: "Inteligência Artificial & Agentes Autônomos",
    optData: "Dashboards & Power BI Analytics",
    optMaker: "Hardware & Impressão 3D Prototipação",
  },
  es: {
    tagline: "Alto Rendimiento Tecnológico",
    heroTitle: "Transformamos",
    heroHighlight: "ideas en resultados.",
    heroSubtitle: "Automatización, Inteligencia Artificial, Dashboards y Soluciones Tecnológicas a la medida para empresas de alto nivel que desean crecer.",
    btnDiagnostic: "Solicitar Diagnóstico Gratuito",
    btnSolutions: "Conocer Soluciones",
    metric1: "Proyectos Desarrollados",
    metric2: "Áreas de Actuación",
    metric3: "Atención Internacional",
    solutionsTag: "Soluciones Estratégicas",
    solutionsTitle: "Nuestras Soluciones",
    solutionsSubtitle: "Organizamos tecnología, datos, inteligencia artificial y prototipado en cuatro áreas estratégicas para acelerar el crecimiento de su empresa.",
    navConsulting: "Consultoría",
    navAi: "Sistemas de IA",
    navData: "Datos",
    navMaker: "Hardware",
    talkToExpert: "HABLAR CON UN EXPERTO",
    diagnostic: "DIAGNÓSTICO",
    all: "Todas",
    consultingTab: "Consultoría",
    aiTab: "Inteligencia Artificial",
    dataTab: "Inteligencia de Datos",
    makerTab: "Ingeniería y Prototipado",
    
    // Cards
    cardConsultingLabel: "Centro de Consultoría",
    cardConsultingTitle: "🐒 Monkey Labs Consulting",
    cardConsultingDesc: "Análisis profundo y reestructuración operacional. Identificamos vulnerabilidades de procesos para trazar caminos tecnológicos eficientes.",
    cardConsultingCheck1: "Consultoría en Tecnología",
    cardConsultingCheck2: "Diagnóstico Empresarial Completo",
    cardConsultingCheck3: "Mapeo de Procesos",
    cardConsultingBottomLabel: "Para su empresa",
    cardConsultingBottomTitle: "Mapeo sin Complicaciones",
    cardConsultingBtn: "Diagnóstico de Consultoría",

    cardAiLabel: "Laboratorio de Agentes IA",
    cardAiTitle: "🐒 Monkey Labs AI",
    cardAiDesc: "Revolucione su flujo operacional con inteligencias artificiales conversacionales y agentes autónomos integrados directamente en su API.",
    cardAiCheck1: "Inteligencia Artificial Personalizada",
    cardAiCheck2: "Agentes de IA Constructivos",
    cardAiCheck3: "Automatizaciones Robotizadas de Chat y WhatsApp",
    cardAiBottomLabel: "Tecnologías GPT y Gemini",
    cardAiBottomTitle: "Reemplace el Trabajo Manual",
    cardAiBtn: "Automatización con IA",

    cardDataLabel: "Analítica de Datos",
    cardDataTitle: "🐒 Monkey Labs Data",
    cardDataDesc: "Transforme información desconexa en inteligencia de mercado estructurada. Rastree métricas esenciales en tiempo real sin planillas complejas.",
    cardDataCheck1: "Dashboards Dinámicos Integrados",
    cardDataCheck2: "Power BI y Analítica de Canvas Personalizada",
    cardDataCheck3: "Inteligencia de Datos y ETL Automatizado",
    cardDataBottomLabel: "Métricas de Decisión",
    cardDataBottomTitle: "Decisiones Rápidas con Datos",
    cardDataBtn: "Dashboards Informativos",

    cardMakerLabel: "Prototipado Rápido",
    cardMakerTitle: "🐒 Monkey Labs Maker",
    cardMakerDesc: "Su producto físico desarrollado desde cero. Ingeniería inversa, mockups, diseño CAD 3D y productos de alto acabado a la medida.",
    cardMakerCheck1: "Impresión 3D de Alta Precisão",
    cardMakerCheck2: "Prototipado Industrial y Mecánico",
    cardMakerCheck3: "Accesorios Corporativos y Productos Personalizados",
    cardMakerBottomLabel: "Hardware bajo Demanda",
    cardMakerBottomTitle: "Prototipado en Pocos Días",
    cardMakerBtn: "Solicitar Prototipo 3D",

    // Footer
    footerSlogan: "Menos planillas. Menos retrabajo. Más resultados.",
    footerCopyright: "© 2026 MONKEY LABS. Tecnología • Inteligencia Artificial • Datos • Prototipado.",
    footerStatus: "Estado Red en Vivo",
    footerContact: "Contacto Directo",

    // Modal
    modalTitle: "Diagnóstico Gratuito",
    modalSub: "Complete los datos para dirigirle al especialista ideal en WhatsApp.",
    labelSol: "Área de Interés Principal *",
    labelName: "Su Nombre *",
    placeholderName: "Ej: Adilson Oliveira",
    labelCompany: "Su Empresa (Opcional)",
    placeholderCompany: "Ej: Monkey Tech",
    labelWhatsapp: "Su WhatsApp *",
    placeholderWhatsapp: "Ej: (45) 99144-8844",
    labelDesc: "Detalle su Desafío (Opcional)",
    placeholderDesc: "Ej: Necesito automatizar la atención de mis clientes e integrarla a mi embudo de ventas...",
    modalBtnSending: "Redireccionando a WhatsApp...",
    modalBtnSend: "Enviar Solicitud por WhatsApp",
    modalTrust: "🔒 Sus datos serán utilizados únicamente para construir el alcance del diagnóstico e iniciar su contacto.",
    
    // Select options inside select dropdown
    optConsulting: "Consultoría en Tecnología y Procesos",
    optAi: "Inteligencia Artificial y Agentes Autónomos",
    optData: "Dashboards y Analítica Power BI",
    optMaker: "Hardware y Prototipado Impresión 3D",
  }
};

export default function App() {
  const [lang, setLang] = useState<"pt" | "es">("pt");
  const t = TRANSLATIONS[lang];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    whatsapp: "",
    solucao: "Monkey Labs AI",
    mensagem: ""
  });
  const [successSubmitted, setSuccessSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "consulting" | "ai" | "data" | "maker">("all");
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>([]);

  // Generate discrete background particles for tech-modern aesthetic
  useEffect(() => {
    const tempParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 10 + 5
    }));
    setParticles(tempParticles);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSolutionSelect = (solName: string) => {
    setFormData(prev => ({
      ...prev,
      solucao: solName
    }));
    setIsModalOpen(true);
  };

  const executeWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.whatsapp) return;

    // Craft standard premium WhatsApp messages dynamically based on language
    const formattedMessage = lang === "pt"
      ? `Olá Monkey Labs! Meu nome é *${formData.nome}*${formData.empresa ? ` da empresa *${formData.empresa}*` : ""}. \n\nEstou entrando em contato através da Landing Page. Gostaria de solicitar um *Diagnóstico Gratuito* de tecnologia focado em:\n👉 *${formData.solucao}*\n\n*WhatsApp para contato*: ${formData.whatsapp}\n${formData.mensagem ? `*Informações adicionais*:\n_"${formData.mensagem}"_` : ""}\n\nAguardo o retorno do especialista para iniciarmos!`
      : `¡Hola Monkey Labs! Mi nombre es *${formData.nome}*${formData.empresa ? ` de la empresa *${formData.empresa}*` : ""}. \n\nMe estoy contactando a través de la Landing Page. Me gustaría solicitar un *Diagnóstico Gratuito* de tecnología enfocado en:\n👉 *${formData.solucao}*\n\n*WhatsApp de contacto*: ${formData.whatsapp}\n${formData.mensagem ? `*Información adicional*:\n_"${formData.mensagem}"_` : ""}\n\n¡Quedo a la espera del especialista para comenzar!`;

    const waEncoded = encodeURIComponent(formattedMessage);
    
    // Smooth transition
    setSuccessSubmitted(true);
    setTimeout(() => {
      window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${waEncoded}`, "_blank");
      setIsModalOpen(false);
      setSuccessSubmitted(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-zinc-200 font-sans grid-pattern relative overflow-x-hidden selection:bg-[#E5A132]/30 selection:text-[#E5A132]">
      
      {/* Decorative Gradient Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#E5A132]/10 to-[#CC5500]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#E5A132]/5 to-transparent blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#CC5500]/8 to-transparent blur-[120px] pointer-events-none" />

      {/* Modern High-End Top Navigation Panel */}
      <header className="sticky top-0 z-40 bg-[#0F0F0F]/80 backdrop-blur-md border-b border-zinc-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3 cursor-pointer group" id="navbar-brand">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5A132] to-[#CC5500] flex items-center justify-center shadow-lg shadow-orange-950/20 group-hover:scale-105 transition-transform duration-300">
              <span className="font-display font-extrabold text-black text-xl tracking-tighter">ML</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-wider text-white flex items-center gap-1">
                MONKEY <span className="text-[#E5A132] font-extrabold text-xs px-1.5 py-0.5 rounded bg-[#E5A132]/10 border border-[#E5A132]/20">LABS</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#CC5500]/80 uppercase">Tecnologia Empresarial</span>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-400" id="desktop-nav">
            <a href="#solucoes" className="hover:text-white transition-colors">{t.navConsulting}</a>
            <a href="#solucoes" className="hover:text-white transition-colors">{t.navAi}</a>
            <a href="#solucoes" className="hover:text-white transition-colors">{t.navData}</a>
            <a href="#solucoes" className="hover:text-white transition-colors">{t.navMaker}</a>
          </nav>

          {/* Premium Call to Action Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Language Selector Flags */}
            <div className="flex items-center gap-1 bg-[#141414]/90 p-1.5 rounded-full border border-zinc-850 shadow-inner">
              <button 
                onClick={() => setLang("pt")}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-350 hover:scale-105 cursor-pointer ${lang === "pt" ? "bg-gradient-to-br from-[#E5A132] to-[#CC5500]/60 ring-2 ring-[#E5A132]/30 shadow-md scale-105" : "hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300"}`}
                title="Português (Brasil)"
              >
                <span className="text-sm">🇧🇷</span>
              </button>
              <button 
                onClick={() => setLang("es")}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-350 hover:scale-105 cursor-pointer ${lang === "es" ? "bg-gradient-to-br from-[#E5A132] to-[#CC5500]/60 ring-2 ring-[#E5A132]/30 shadow-md scale-105" : "hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300"}`}
                title="Español (Paraguay)"
              >
                <span className="text-sm">🇵🇾</span>
              </button>
            </div>

            <a 
              href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(DEFAULT_WHATSAPP_TEXTS[lang])}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-wider font-semibold border border-zinc-800 hover:border-[#E5A132]/30 px-4 py-2.5 rounded-full text-white bg-white/5 hover:bg-[#E5A132]/15 transition-all duration-300"
              id="cta-contact-whatsapp"
            >
              <Phone size={13} className="text-[#E5A132]" />
              {t.talkToExpert}
            </a>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#E5A132] text-black text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-full hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              id="cta-diag-free"
            >
              {t.diagnostic}
            </button>
          </div>

        </div>
      </header>

      {/* HERO SECTION / FIRST FOLD LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-140px)]">
          
          {/* LEFT SIDE CONTENT - HERO TEXT */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8" id="hero-left-column">
            
            {/* High-end Tagline Pill */}
            <div className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5A132]/5 border border-[#E5A132]/20 shadow-md shadow-orange-950/20">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CC5500] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CC5500]"></span>
              </span>
              <p className="text-[11px] font-mono font-semibold tracking-wider text-[#E5A132] uppercase flex items-center gap-1">
                <Sparkles size={12} /> {t.tagline}
              </p>
            </div>

            {/* Main Catchy Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.05]">
                {t.heroTitle} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5A132] to-[#FF8C00] text-glow-orange">
                  {t.heroHighlight}
                </span>
              </h1>
              
              {/* Sleek Underline Accent */}
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#E5A132] to-[#CC5500]" />
            </div>

            {/* Subtitle */}
            <p className="text-zinc-400 text-lg sm:text-xl font-light leading-relaxed max-w-xl">
              {t.heroSubtitle}
            </p>

            {/* Premium Call to Action Area */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#E5A132] text-black font-display font-bold px-8 py-4 rounded-full shadow-xl shadow-[#CC5500]/10 hover:brightness-110 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                id="btn-trigger-diagnostico"
              >
                {t.btnDiagnostic}
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <a
                href="#solucoes"
                className="px-8 py-4 rounded-full bg-zinc-900 border border-zinc-850 hover:border-[#E5A132]/30 text-white hover:bg-[#E5A132]/5 text-center font-display font-semibold hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                id="btn-scroll-solutions"
              >
                {t.btnSolutions}
              </a>
            </div>

            {/* Micro-Indicators Dashboard Panel */}
            <div className="pt-8 border-t border-zinc-800 space-y-4" id="indicadores">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-2">
                
                {/* Metric 1 */}
                <div className="flex flex-col p-3 rounded-xl hover:bg-white/[0.02] transition duration-200">
                  <span className="text-2xl font-bold text-[#E5A132] flex items-center gap-1">
                    +20
                    <span className="text-[#CC5500] text-sm font-mono">+</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">{t.metric1}</span>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col p-3 rounded-xl hover:bg-white/[0.02] transition duration-200">
                  <span className="text-2xl font-bold text-[#E5A132] flex items-center gap-1">
                    4
                    <span className="text-[#CC5500] text-xs font-mono">áreas</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">{t.metric2}</span>
                </div>

                {/* Metric 3 */}
                <div className="flex flex-col p-3 rounded-xl hover:bg-white/[0.02] transition duration-200 col-span-1">
                  <span className="text-xl font-display font-bold text-[#E5A132] flex items-center gap-2">
                    <Globe size={18} className="text-[#E5A132] animate-pulse" />
                    Brasil e Paraguai
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-2">{t.metric3}</span>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT SIDE CONTENT - CORPORATE GORILLA & TECH GLOWS */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[400px] lg:min-h-[550px]" id="hero-right-column">
            
            {/* Golden Lighting Glow Effects Behind the Gorilla */}
            <div className="absolute w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-r from-[#E5A132]/20 via-[#CC5500]/15 to-transparent blur-[70px] -translate-x-1/10 -translate-y-1/10 opacity-80" />
            
            {/* Tech Particles Overlay (moving around subtly) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {particles.map(p => (
                <div 
                  key={p.id}
                  className="absolute rounded-full bg-[#E5A132]/40"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    boxShadow: "0 0 10px rgba(229, 161, 50, 0.5)",
                    transition: `transform ${p.speed}s linear`,
                    animation: `pulse ${p.speed / 2}s infinite alternate`
                  }}
                />
              ))}
            </div>

            {/* Glowing Tech Elements Floating */}
            <div className="absolute top-[12%] right-[10%] z-20 hover:scale-105 transition-transform duration-300">
              <div className="bg-[#141414]/90 backdrop-blur-md border border-zinc-800 hover:border-[#E5A132]/40 px-3 py-2 rounded-xl flex items-center gap-2.5 shadow-2xl">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">IA AGENT MODEL</span>
                  <span className="text-xs text-white font-semibold">Active & Live</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[8%] left-[5%] z-20 hover:scale-105 transition-transform duration-300">
              <div className="bg-[#141414]/90 backdrop-blur-md border border-zinc-800 hover:border-[#CC5500]/40 px-3.5 py-2.5 rounded-xl flex items-center gap-3 shadow-2xl">
                <BarChart3 size={15} className="text-[#E5A132]" />
                <div className="flex flex-col text-left font-mono">
                  <span className="text-[9px] text-zinc-500 uppercase">Data Pipelines</span>
                  <span className="text-xs text-white font-semibold font-sans">99.8% Automation</span>
                </div>
              </div>
            </div>

            {/* Premium framed gorilla photo */}
            <div className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden bg-[#141414] border border-zinc-800 shadow-2xl drop-shadow-[0_20px_50px_rgba(229,161,50,0.15)] group" id="gorilla-avatar-card">
              
              {/* Inner ambient glow border */}
              <div className="absolute inset-0 border border-gradient-to-tr from-[#E5A132]/20 to-transparent rounded-2xl pointer-events-none z-10" />

              {/* Real Gorilla Image */}
              <div className="w-full h-full relative bg-[#1A1A1A]">
                <img 
                  src={gorillaImg}
                  alt="Monkey Labs Corporate Gorilla"
                  className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-700 ease-out" 
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>

          </div>

        </div>
      </main>

       {/* SOLUTIONS SECTION - THE CORE PILLARS */}
      <section className="bg-[#0A0A0A] py-24 border-y border-zinc-900 relative z-10" id="solucoes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Soluções */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-[#CC5500] text-xs font-mono tracking-widest uppercase font-semibold">
              <Activity size={12} className="animate-pulse" /> {t.solutionsTag}
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              {t.solutionsTitle}
            </h2>
            
            <p className="text-zinc-400 text-base sm:text-lg">
              {t.solutionsSubtitle}
            </p>
          </div>

          {/* Tab Filter Action menu */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {[
              { id: "all", label: t.all },
              { id: "consulting", label: t.consultingTab },
              { id: "ai", label: t.aiTab },
              { id: "data", label: t.dataTab },
              { id: "maker", label: t.makerTab }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4.5 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-250 cursor-pointer ${
                  activeTab === tab.id 
                    ? "bg-[#E5A132] text-black shadow-lg shadow-[#CC5500]/10 scale-102" 
                    : "bg-[#141414] text-zinc-400 hover:text-white border border-zinc-850 hover:bg-zinc-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Solutions Detailed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* CARD 1: 🐒 Monkey Labs Consulting */}
            <AnimatePresence mode="popLayout">
              {(activeTab === "all" || activeTab === "consulting") && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#141414] hover:bg-[#1A1A1A] border border-zinc-850 hover:border-[#E5A132]/30 p-8 rounded-2xl flex flex-col justify-between group transition-all duration-300"
                >
                  <div className="space-y-6">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="p-3.5 rounded-xl bg-[#E5A132]/5 border border-[#E5A132]/20 text-[#E5A132]">
                        <Briefcase size={24} />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">{t.cardConsultingLabel}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2 group-hover:text-[#E5A132] transition-colors">
                        {t.cardConsultingTitle}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {t.cardConsultingDesc}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#E5A132]/10 flex items-center justify-center text-[#E5A132] text-xs">
                          <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{t.cardConsultingCheck1}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#E5A132]/10 flex items-center justify-center text-[#E5A132] text-xs">
                          <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{t.cardConsultingCheck2}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#E5A132]/10 flex items-center justify-center text-[#E5A132] text-xs">
                          <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{t.cardConsultingCheck3}</span>
                      </div>
                    </div>

                  </div>

                  {/* Action Link */}
                  <div className="pt-8 flex items-center justify-between border-t border-zinc-850 mt-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-zinc-505 uppercase text-zinc-500">{t.cardConsultingBottomLabel}</span>
                      <span className="text-xs text-white font-semibold">{t.cardConsultingBottomTitle}</span>
                    </div>
                    <button 
                      onClick={() => handleSolutionSelect("Monkey Labs Consulting")}
                      className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-[#E5A132] hover:text-black hover:border-[#E5A132] text-xs font-mono font-bold tracking-wide transition-all duration-300"
                    >
                      {t.cardConsultingBtn}
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            {/* CARD 2: 🐒 Monkey Labs AI */}
            <AnimatePresence mode="popLayout">
              {(activeTab === "all" || activeTab === "ai") && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#141414] hover:bg-[#1A1A1A] border border-zinc-850 hover:border-[#CC5500]/30 p-8 rounded-2xl flex flex-col justify-between group transition-all duration-300"
                >
                  <div className="space-y-6">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="p-3.5 rounded-xl bg-[#CC5500]/5 border border-[#CC5500]/20 text-[#CC5500]">
                        <Brain size={24} />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">{t.cardAiLabel}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2 group-hover:text-[#CC5500] transition-colors">
                        {t.cardAiTitle}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {t.cardAiDesc}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#CC5500]/10 flex items-center justify-center text-[#CC5500] text-xs">
                          <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{t.cardAiCheck1}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#CC5500]/10 flex items-center justify-center text-[#CC5500] text-xs">
                          <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{t.cardAiCheck2}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#CC5500]/10 flex items-center justify-center text-[#CC5500] text-xs">
                          <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{t.cardAiCheck3}</span>
                      </div>
                    </div>

                  </div>

                  {/* Action Link */}
                  <div className="pt-8 flex items-center justify-between border-t border-zinc-850 mt-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-zinc-505 uppercase text-zinc-500">{t.cardAiBottomLabel}</span>
                      <span className="text-xs text-white font-semibold">{t.cardAiBottomTitle}</span>
                    </div>
                    <button 
                      onClick={() => handleSolutionSelect("Monkey Labs AI")}
                      className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-[#E5A132] hover:text-black hover:border-[#E5A132] text-xs font-mono font-bold tracking-wide transition-all duration-300"
                    >
                      {t.cardAiBtn}
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            {/* CARD 3: 🐒 Monkey Labs Data */}
            <AnimatePresence mode="popLayout">
              {(activeTab === "all" || activeTab === "data") && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#141414] hover:bg-[#1A1A1A] border border-zinc-850 hover:border-[#E5A132]/30 p-8 rounded-2xl flex flex-col justify-between group transition-all duration-300"
                >
                  <div className="space-y-6">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="p-3.5 rounded-xl bg-[#E5A132]/5 border border-[#E5A132]/20 text-[#E5A132]">
                        <BarChart3 size={24} />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">{t.cardDataLabel}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2 group-hover:text-[#E5A132] transition-colors">
                        {t.cardDataTitle}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {t.cardDataDesc}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#E5A132]/10 flex items-center justify-center text-[#E5A132] text-xs">
                          <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{t.cardDataCheck1}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#E5A132]/10 flex items-center justify-center text-[#E5A132] text-xs">
                          <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{t.cardDataCheck2}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#E5A132]/10 flex items-center justify-center text-[#E5A132] text-xs">
                          <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{t.cardDataCheck3}</span>
                      </div>
                    </div>

                  </div>

                  {/* Action Link */}
                  <div className="pt-8 flex items-center justify-between border-t border-zinc-850 mt-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-zinc-505 uppercase text-zinc-500">{t.cardDataBottomLabel}</span>
                      <span className="text-xs text-white font-semibold">{t.cardDataBottomTitle}</span>
                    </div>
                    <button 
                      onClick={() => handleSolutionSelect("Monkey Labs Data")}
                      className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-[#E5A132] hover:text-black hover:border-[#E5A132] text-xs font-mono font-bold tracking-wide transition-all duration-300"
                    >
                      {t.cardDataBtn}
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            {/* CARD 4: 🐒 Monkey Labs Maker */}
            <AnimatePresence mode="popLayout">
              {(activeTab === "all" || activeTab === "maker") && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#141414] hover:bg-[#1A1A1A] border border-zinc-850 hover:border-[#CC5500]/30 p-8 rounded-2xl flex flex-col justify-between group transition-all duration-300"
                >
                  <div className="space-y-6">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="p-3.5 rounded-xl bg-[#CC5500]/5 border border-[#CC5500]/20 text-[#CC5500]">
                        <Printer size={24} />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">{t.cardMakerLabel}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2 group-hover:text-[#CC5500] transition-colors">
                        {t.cardMakerTitle}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {t.cardMakerDesc}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#CC5500]/10 flex items-center justify-center text-[#CC5500] text-xs">
                          <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{t.cardMakerCheck1}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#CC5500]/10 flex items-center justify-center text-[#CC5500] text-xs">
                          <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{t.cardMakerCheck2}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#CC5500]/10 flex items-center justify-center text-[#CC5500] text-xs">
                          <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{t.cardMakerCheck3}</span>
                      </div>
                    </div>

                  </div>

                  {/* Action Link */}
                  <div className="pt-8 flex items-center justify-between border-t border-zinc-850 mt-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-zinc-555 uppercase text-zinc-500">{t.cardMakerBottomLabel}</span>
                      <span className="text-xs text-white font-semibold">{t.cardMakerBottomTitle}</span>
                    </div>
                    <button 
                      onClick={() => handleSolutionSelect("Monkey Labs Maker")}
                      className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-zinc-900 border border-zinc-850 hover:bg-[#E5A132] hover:text-black hover:border-[#E5A132] text-xs font-mono font-bold tracking-wide transition-all duration-300"
                    >
                      {t.cardMakerBtn}
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* FOOTER OF THE FIRST FOLD / TRANSITION BANNER */}
      <footer className="relative bg-[#0F0F0F] border-t border-zinc-900 py-12 overflow-hidden z-10" id="footer-landing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Key slogan emphasized by User */}
          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-zinc-400">
              "{lang === "pt" ? "Menos planilhas. Menos retrabalho. " : "Menos planillas. Menos retrabajo. "}<span className="text-white font-semibold font-sans">{lang === "pt" ? "Mais resultados." : "Más resultados."}</span>"
            </h4>
            <p className="text-[11px] font-mono tracking-widest text-[#CC5500] uppercase font-bold">MONKEY LABS STRATEGY</p>
          </div>

          <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-[#E5A132] to-[#CC5500] flex items-center justify-center text-[10px] text-black font-bold">ML</div>
              <span className="text-xs font-mono text-zinc-505">{t.footerCopyright}</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5 hover:text-white transition duration-200">
                <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping" />
                {t.footerStatus}
              </span>
              <a 
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(DEFAULT_WHATSAPP_TEXTS[lang])}`}
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#E5A132] transition duration-200"
              >
                {t.footerContact}
              </a>
            </div>

          </div>

        </div>
      </footer>

      {/* INTERACTIVE DIAGNOSIS FORM MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark glass Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-[#0F0F0F] rounded-2xl border border-zinc-855 p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              
              {/* Corner decorative light */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#E5A132]/10 blur-[40px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-start justify-between relative z-10 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white flex items-center gap-2">
                    <span className="text-[#E5A132]">🐒</span> {t.modalTitle}
                  </h3>
                  <p className="text-xs text-zinc-405 mt-1">
                    {t.modalSub}
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={executeWhatsAppRedirect} className="space-y-4 relative z-10">
                
                {/* Solução Field */}
                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{t.labelSol}</label>
                  <select
                    name="solucao"
                    value={formData.solucao}
                    onChange={handleInputChange}
                    className="w-full bg-[#141414] hover:bg-zinc-900 border border-zinc-850 focus:border-[#E5A132] rounded-lg px-3.5 py-2.5 text-sm outline-none transition text-white"
                  >
                    <option value="Monkey Labs Consulting">{t.optConsulting}</option>
                    <option value="Monkey Labs AI">{t.optAi}</option>
                    <option value="Monkey Labs Data">{t.optData}</option>
                    <option value="Monkey Labs Maker">{t.optMaker}</option>
                  </select>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Nome */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-505 uppercase tracking-widest mb-1.5">{t.labelName}</label>
                    <input
                      required
                      type="text"
                      name="nome"
                      placeholder={t.placeholderName}
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="w-full bg-[#141414] hover:bg-zinc-900 border border-zinc-850 focus:border-[#E5A132] rounded-lg px-3.5 py-2.5 text-sm outline-none transition text-white"
                    />
                  </div>

                  {/* Empresa */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-505 uppercase tracking-widest mb-1.5">{t.labelCompany}</label>
                    <input
                      type="text"
                      name="empresa"
                      placeholder={t.placeholderCompany}
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className="w-full bg-[#141414] hover:bg-zinc-900 border border-zinc-850 focus:border-[#E5A132] rounded-lg px-3.5 py-2.5 text-sm outline-none transition text-white"
                    />
                  </div>

                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label className="block text-xs font-mono text-zinc-505 uppercase tracking-widest mb-1.5">{t.labelWhatsapp}</label>
                  <input
                    required
                    type="tel"
                    name="whatsapp"
                    placeholder={t.placeholderWhatsapp}
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full bg-[#141414] hover:bg-zinc-900 border border-zinc-850 focus:border-[#E5A132] rounded-lg px-3.5 py-2.5 text-sm outline-none transition text-white"
                  />
                </div>

                {/* Mensagem info */}
                <div>
                  <label className="block text-xs font-mono text-zinc-505 uppercase tracking-widest mb-1.5">{t.labelDesc}</label>
                  <textarea
                    name="mensagem"
                    placeholder={t.placeholderDesc}
                    rows={3}
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    className="w-full bg-[#141414] hover:bg-zinc-900 border border-zinc-850 focus:border-[#E5A132] rounded-lg px-3.5 py-2.5 text-sm outline-none transition text-white resize-none"
                  />
                </div>

                {/* Success or Action Submit Button */}
                <div className="pt-4">
                  {successSubmitted ? (
                    <motion.div 
                      initial={{ scale: 0.98 }}
                      animate={{ scale: 1 }}
                      className="w-full py-3.5 rounded-full bg-green-500 text-black text-center font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/10"
                    >
                      <CheckCircle2 size={16} />
                      {t.modalBtnSending}
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#E5A132] text-black font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer hover:scale-[1.01] active:scale-95 transition-all duration-300"
                    >
                      <Send size={15} />
                      {t.modalBtnSend}
                    </button>
                  )}
                </div>

                {/* Secure Trust Note */}
                <div className="text-center text-[10px] text-zinc-500">
                  {t.modalTrust}
                </div>

              </form>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
