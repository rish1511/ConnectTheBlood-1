import BacktoHome from './BacktoHome';

const AuthLeftPage = () => {
  return (
    <>
    <div className="hidden lg:flex flex-1 bg-gradient-to-br from-red-50 to-pink-50 items-center justify-center p-12 border-l border-gray-100">
              <BacktoHome/>
        <div className="text-center">
          <div className="text-9xl mb-6">
            🩸
          </div>

          <p className="text-2xl font-bold text-gray-900 mb-2">
            Give. Receive. Live.
          </p>

          <p className="text-gray-500 text-sm max-w-xs">
            Join thousands of donors and
            recipients making a difference
            every day.
          </p>
        </div>
      </div>
    </>
  )
}

export default AuthLeftPage
