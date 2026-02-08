const API_URL = "https://secondbrain-backend-2mei.onrender.com/";

export async function fetchKnowledge() {
  const res = await fetch(`${API_URL}/knowledge`);
  return res.json();
}

export async function addKnowledge(data: {
  title: string;
  content: string;
}) {
  const res = await fetch(`${API_URL}/knowledge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
