import MembersTable from "@/components/MembersTable";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-white flex items-center  justify-center p-12">
      <div className="w-full max-w-10xl mx-auto">
        <div className="bg-[#071018] rounded-xl p-8 mx-auto w-full h-[100vh]">
          <div className="text-left mb-6">
            <h1 className="text-2xl font-semibold mb-1 text-white">Members</h1>
            <p className="text-gray-400 text-md">View your members here.</p>
          </div>
          <MembersTable />
        </div>
      </div>
    </main>
  );
}
