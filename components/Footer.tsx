export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row justify-between items-center text-gray-600">
        <p>&copy; 2025 SkillSwap. All rights reserved.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="/terms" className="hover:text-blue-600">Terms</a>
          <a href="/privacy" className="hover:text-blue-600">Privacy</a>
          <a href="/contact" className="hover:text-blue-600">Contact</a>
        </div>
      </div>
    </footer>
  );
}