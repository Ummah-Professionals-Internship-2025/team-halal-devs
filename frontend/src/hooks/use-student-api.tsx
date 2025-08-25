// import { QueryClient, useQueryClient, useQuery } from "@tanstack/react-query";

// interface Student {
//   id: Number;
//   meeting: Number;
//   participant_name: String;
//   email: String;
//   phone_number: String;
//   industry: String;
//   academic_year: String;
//   seeking_service: String;
//   // can do a finite list for a union of all possible answers
//   // ex: seeking_services: "resume review" | "general career advice" | "interview"
//   resume_upload: File;
//   hear_about: String;
//   optional_info: String;
//   send_to_email: Boolean;
//   prof_assigned: Boolean;
//   created_at: String;
// }

// function useStudentApi() {
//   const queryClient = useQueryClient();

//   const query = useQuery({ queryKey: ["student"], queryFn: getTodos });

//   const res = await fetch(`${import.meta.env.VITE_API_URL}student/`, {
//     method: "POST", //sending data - taking form values, setting inside database
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//     body: JSON.stringify({
//       id: student,
//       meeting: Number,
//     }),
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }

// import { useQuery } from "@tanstack/react-query"; // Or 'react-query' for older versions

// const fetchData = async () => {
//   const response = await fetch("https://api.example.com/data");
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// };

// function MyComponent() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["myData"], // Unique key for caching
//     queryFn: fetchData, // The function that performs the fetch call
//   });

//   if (isLoading) {
//     return <div>Loading data...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <h1>Data:</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }

// export default MyComponent;
