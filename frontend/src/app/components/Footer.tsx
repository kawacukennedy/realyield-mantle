export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">RealYield</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Compliant on-chain yield vaults for real-world assets on Mantle.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Product</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Dashboard</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Vaults</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Assets</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Help Center</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">API Docs</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2024 RealYield. Built on Mantle.
        </div>
      </div>
    </footer>
  );
}