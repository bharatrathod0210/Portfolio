export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-6 bg-[#0d1117] border-t border-[#30363d] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div
            className="absolute bottom-0 left-1/4 w-16 h-16 rounded-full bg-[#58a6ff] animate-pulse"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-0 right-1/4 w-20 h-20 rounded-full bg-[#238636] animate-pulse"
            style={{ animationDuration: "6s" }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-sm text-[#8b949e]">© {currentYear} Bharat Rathod. All rights reserved.</span>
          </div>

          <div>
            <span className="text-sm text-[#8b949e]">
              Built with <span className="text-[#58a6ff] animate-pulse">React</span> &{" "}
              <span className="text-[#f0883e] animate-pulse">❤️</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
