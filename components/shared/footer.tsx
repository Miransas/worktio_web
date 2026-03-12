import Link from "next/link"

export default function Footer() {
    const year = new Date().getFullYear()
  return (
    <footer className="bg-black text-gray-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Logo + description */}
        <div>
          <h2 className="text-white text-xl font-semibold tracking-wide">
            Miransas & Worktio
          </h2> 
          <p className="mt-4 text-sm text-gray-500 leading-relaxed">
            Building AI tools, games and modern software experiences.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Products</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">AI Tools</li>
            <li className="hover:text-white cursor-pointer">Games</li>
            <li className="hover:text-white cursor-pointer">API</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Social</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">GitHub</li>
            <li className="hover:text-white cursor-pointer">Twitter</li>
            <li className="hover:text-white cursor-pointer">Discord</li>
          </ul>
        </div>

      </div>

      {/* bottom */}
      <div className="border-t border-neutral-800">
        <Link href="https://miransas.com" className="flex gap-2">
        <img src="./miransas.png" alt="" className="w-18 " />  
        <p className="font-stretch-normal text-xl mt-9">© {year} Miransas. All rights reserved.</p>
        </Link>

        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between text-sm text-gray-500">
          <div>
            aa
          </div>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

