import collegesService from "./(services)/colleges-service";
import CollegeSelector from "./college-selector";

export default async function HomePage() {
  const colleges = await collegesService.getColleges();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-4xl font-bold">Select a school to get started:</h1>
        <CollegeSelector colleges={colleges} />
      </div>
    </main>
  );
}
