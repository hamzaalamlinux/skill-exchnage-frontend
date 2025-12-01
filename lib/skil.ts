import api from "./api";

// Fetch all skills
export async function getSkills() {
  const res = await api.get("/skills");
  return res.data;
}

// Add a new skill
export async function addSkill(data: {
  skill_name: string;
  description?: string;
  category?: string;
  image?: File;
}) {
  const formData = new FormData();
  formData.append("skill_name", data.skill_name);
  if (data.description) formData.append("description", data.description);
  if (data.category) formData.append("category", data.category);
  if (data.image) formData.append("image", data.image);

  const res = await api.post("/skills", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}
