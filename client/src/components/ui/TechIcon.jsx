/**
 * TechIcon — verified against installed react-icons versions.
 * Uses react-icons/si for brand logos, react-icons/fa for fallbacks.
 */
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiThreedotjs, SiGsap, SiGreensock, SiVite, SiHtml5, SiJavascript,
  SiNodedotjs, SiExpress, SiGraphql, SiSocketdotio, SiJsonwebtokens,
  SiMongodb, SiPostgresql, SiRedis, SiFirebase, SiMysql,
  SiGit, SiGithub, SiDocker, SiVercel, SiCloudinary, SiRedux,
  SiWordpress, SiPhp, SiNodemon,
  SiRazorpay, SiStripe, SiPaypal, SiPaytm, SiPhonepe, SiGooglepay,
  SiKlarna, SiApplepay, SiBraintree,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const MAP = {
  // ── Frontend ──────────────────────────────────────────────────────────────
  'react':           { Icon: SiReact,          color: '#61DAFB' },
  'react.js':        { Icon: SiReact,          color: '#61DAFB' },
  'next.js':         { Icon: SiNextdotjs,      color: '#ffffff' },
  'nextjs':          { Icon: SiNextdotjs,      color: '#ffffff' },
  'typescript':      { Icon: SiTypescript,     color: '#3178C6' },
  'tailwind':        { Icon: SiTailwindcss,    color: '#06B6D4' },
  'tailwind css':    { Icon: SiTailwindcss,    color: '#06B6D4' },
  'tailwindcss':     { Icon: SiTailwindcss,    color: '#06B6D4' },
  'framer motion':   { Icon: SiFramer,         color: '#ffffff' },
  'framer':          { Icon: SiFramer,         color: '#ffffff' },
  'three.js':        { Icon: SiThreedotjs,     color: '#ffffff' },
  'threejs':         { Icon: SiThreedotjs,     color: '#ffffff' },
  'gsap':            { Icon: SiGsap,           color: '#88CE02' },
  'greensock':       { Icon: SiGreensock,      color: '#88CE02' },
  'vite':            { Icon: SiVite,           color: '#646CFF' },
  'html':            { Icon: SiHtml5,          color: '#E34F26' },
  'html5':           { Icon: SiHtml5,          color: '#E34F26' },
  'javascript':      { Icon: SiJavascript,     color: '#F7DF1E' },
  'js':              { Icon: SiJavascript,     color: '#F7DF1E' },
  // ── Backend ───────────────────────────────────────────────────────────────
  'node.js':         { Icon: SiNodedotjs,      color: '#339933' },
  'nodejs':          { Icon: SiNodedotjs,      color: '#339933' },
  'express':         { Icon: SiExpress,        color: '#ffffff' },
  'express.js':      { Icon: SiExpress,        color: '#ffffff' },
  'graphql':         { Icon: SiGraphql,        color: '#E10098' },
  'socket.io':       { Icon: SiSocketdotio,    color: '#ffffff' },
  'jwt':             { Icon: SiJsonwebtokens,  color: '#d63aff' },
  'jwt auth':        { Icon: SiJsonwebtokens,  color: '#d63aff' },
  'rest apis':       { Icon: SiNodedotjs,      color: '#339933' },
  'nodemon':         { Icon: SiNodemon,        color: '#76D04B' },
  'php':             { Icon: SiPhp,            color: '#777BB4' },
  // ── Database ──────────────────────────────────────────────────────────────
  'mongodb':         { Icon: SiMongodb,        color: '#47A248' },
  'postgresql':      { Icon: SiPostgresql,     color: '#4169E1' },
  'redis':           { Icon: SiRedis,          color: '#DC382D' },
  'firebase':        { Icon: SiFirebase,       color: '#FFCA28' },
  'mysql':           { Icon: SiMysql,          color: '#4479A1' },
  // ── DevOps / Tools ────────────────────────────────────────────────────────
  'git':             { Icon: SiGit,            color: '#F05032' },
  'git & github':    { Icon: SiGithub,         color: '#ffffff' },
  'github':          { Icon: SiGithub,         color: '#ffffff' },
  'docker':          { Icon: SiDocker,         color: '#2496ED' },
  'vercel':          { Icon: SiVercel,         color: '#ffffff' },
  'aws':             { Icon: FaAws,            color: '#FF9900' },
  'aws s3':          { Icon: FaAws,            color: '#FF9900' },
  'cloudinary':      { Icon: SiCloudinary,     color: '#3448C5' },
  'redux':           { Icon: SiRedux,          color: '#764ABC' },
  'wordpress':       { Icon: SiWordpress,      color: '#21759B' },
  // ── Payment Gateways ──────────────────────────────────────────────────────
  'razorpay':        { Icon: SiRazorpay,       color: '#2563EB' },
  'stripe':          { Icon: SiStripe,         color: '#635BFF' },
  'paypal':          { Icon: SiPaypal,         color: '#003087' },
  'paytm':           { Icon: SiPaytm,          color: '#00BAF2' },
  'phonepe':         { Icon: SiPhonepe,        color: '#5F259F' },
  'phone pe':        { Icon: SiPhonepe,        color: '#5F259F' },
  'google pay':      { Icon: SiGooglepay,      color: '#4285F4' },
  'googlepay':       { Icon: SiGooglepay,      color: '#4285F4' },
  'gpay':            { Icon: SiGooglepay,      color: '#4285F4' },
  'apple pay':       { Icon: SiApplepay,       color: '#ffffff' },
  'applepay':        { Icon: SiApplepay,       color: '#ffffff' },
  'klarna':          { Icon: SiKlarna,         color: '#FFB3C7' },
  'braintree':       { Icon: SiBraintree,      color: '#3D95CE' },
};

export default function TechIcon({ name = '', size = 24, className = '' }) {
  const entry = MAP[name.toLowerCase().trim()];

  if (entry) {
    const { Icon, color } = entry;
    return <Icon size={size} style={{ color }} className={className} aria-label={name} />;
  }

  // Letter badge fallback
  return (
    <span
      aria-label={name}
      className={`inline-flex items-center justify-center rounded font-medium font-mono flex-shrink-0 ${className}`}
      style={{
        width: size, height: size,
        fontSize: Math.round(size * 0.48),
        background: 'rgba(168,85,247,0.15)',
        border: '1px solid rgba(168,85,247,0.3)',
        color: '#a855f7',
      }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
