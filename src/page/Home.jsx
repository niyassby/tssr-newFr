import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AiIdeaIcon, Book02Icon, Mortarboard02Icon, NoteEditIcon, PenTool03Icon, Resize01Icon, SecurityCheckIcon } from "hugeicons-react";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"

function Home() {
  const navigate = useNavigate();
  const loginIcons = [SecurityCheckIcon, NoteEditIcon, Mortarboard02Icon]
  const loginIcons2 = [Book02Icon, NoteEditIcon, PenTool03Icon]

  const [particles, setParticles] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Generate initial particles
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 60 + 20,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }))
    setParticles(initialParticles)

    // Mouse move handler
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])
  return (
    <>
    <div className="fixed inset-0 -z-10 overflow-hidden bg-w">
      {/* Gradient background with animation */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(62, 165, 118, 0.3) 0%, 
              transparent 50%),
            linear-gradient(135deg, 
              rgba(0, 139, 82, 0.1) 0%, 
              rgba(62, 165, 118, 0.05) 25%,
              transparent 50%,
              rgba(210, 82, 0, 0.05) 75%,
              rgba(0, 139, 82, 0.1) 100%)
          `,
          backgroundSize: "400% 400%",
          animation: "gradient-shift 8s ease infinite",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/20 blur-sm"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float ${4 + particle.speed}s ease-in-out infinite`,
            animationDelay: `${particle.id * 0.5}s`,
          }}
        />
      ))}

      {/* Drifting elements */}
      <div className="absolute top-1/4 left-0 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-[drift_20s_linear_infinite]" />
      <div className="absolute top-3/4 left-0 w-24 h-24 bg-primary/15 rounded-full blur-lg animate-[drift_25s_linear_infinite] animation-delay-[5s]" />
      <div className="absolute top-1/2 left-0 w-40 h-40 bg-secondary/8 rounded-full blur-2xl animate-[drift_30s_linear_infinite] animation-delay-[10s]" />

      {/* Pulsing glow effects */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-[pulse-glow_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-accent/8 rounded-full blur-2xl animate-[pulse-glow_8s_ease-in-out_infinite] animation-delay-[3s]" />
    </div>
    <div className="w-full min-h-screen p-4 flex items-center max-md:flex-col justify-center gap-4 ">
      <Card className="w-full max-w-sm relative group overflow-hidden  shadow-none hover:shadow-2xl transition-all duration-200 rounded-3xl">
        <div className="absolute size-0 group-hover:size-40 transition-all duration-500 rounded-full bg-lime-100/80 -top-20 -right-10"></div>
        <CardContent>
          <div>
            <div className="size-14 text-black rounded-full grid place-content-center border bg-lime-300">
              <Resize01Icon size={20} />
            </div>
            <div className="mt-5">
              <h1 className="text-xl font-semibold">App Login</h1>
              <p className='mt-2 text-sm text-muted-foreground'>Your gateway to streamlined task management for Study Centers.Effortlessly manage daily operations, track tasks, and stay updated on important schedules.</p>
              {/* <p className='mt-2 text-sm text-muted-foreground'>TSSR Council offers franchise opportunities for authorized training & skill development centers, driving industry collaboration in science and tech education</p> */}
            </div>

            <div className="mt-4 flex items-center gap-2">
              {loginIcons.map((Icon, index) => (
                <div key={index} className="size-10 hover:bg-accent  rounded-xl grid place-content-center border ">
                  <Icon size={16} />
                </div>
              ))
              }
            </div>
            
            <div className="mt-6">
              <button
                className="w-full rounded-full border group cursor-pointer text-black py-2 px-4 bg-lime-300/80 hover:bg-lime-200 transition-all font-semibold flex items-center justify-center gap-2"
                onClick={() => navigate("/Login")}
              >
                <span>Login Now</span>
                <ArrowRight
                  className="group-hover:translate-x-1 transition-all duration-300"
                  size={18}
                />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-sm relative group overflow-hidden  shadow-none hover:shadow-2xl transition-all duration-200 rounded-3xl">
        <div className="absolute size-0 group-hover:size-40 transition-all duration-500 rounded-full bg-fuchsia-100/80 -top-20 -right-10"></div>
        <CardContent>
          <div>
            <div className="size-14 text-black rounded-full grid place-content-center border bg-fuchsia-300">
              <AiIdeaIcon size={20} />
            </div>
            <div className="mt-5">
              <h1 className="text-xl font-semibold">Visit Website</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Access official updates, student results, hall tickets, and
                center requests – all in one place. Stay informed about new
                programs, events with TSSR
                Council.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {loginIcons2.map((Icon, index) => (
                <div key={index} className="size-10 hover:bg-accent  rounded-xl grid place-content-center border ">
                  <Icon size={16} />
                </div>
              ))
              }
            </div>
            <div className="mt-6">
              <a
                href="https://tssrcouncil.com"
                target="_blank"
                className="w-full rounded-full border group cursor-pointer text-black py-2 px-4 bg-fuchsia-300/80 hover:bg-fuchsia-200 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <span>Visit Now</span>
                <ArrowRight
                  className="group-hover:translate-x-1 transition-all duration-300"
                  size={18}
                />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div></>
  );
}

export default Home;
