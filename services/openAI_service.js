import openai from "../config/openai.js";

export const reviewCV = async (cv) => {
  const prompt = `Role:
You are a professional recruiter providing structured feedback on a CV. Your feedback should focus on clarity, structure, formatting, and missing details, ensuring the CV is optimized for job applications.

Evaluation Criteria:
1. Work Experience:
a. Ensure company names and work dates (month/year) are included.
b. Provide a brief description of the company and an understandable summary of responsibilities and achievements for both technical and non-technical audiences.
c. Example Edit:
Before: Software Engineer at XYZ Corp.
After: Software Engineer at XYZ Corp. (Jan 2021 – Present) | A leading SaaS provider specializing in AI-driven solutions.
2. Skills Summary:
a. Include only relevant skills, avoiding redundancy.
b. Ensure logical grouping (e.g., Backend Development, DevOps, Databases).
c. Example Edit:
Before: Skills: Python, JavaScript, Node.js, REST APIs, Git, Docker, MySQL, PostgreSQL, Kubernetes, MongoDB, CI/CD
After: "Backend Development: Node.js, REST APIs"
"Databases: MySQL, PostgreSQL, MongoDB"
"DevOps: Docker, Kubernetes, CI/CD"
3. Education:
a. List academic qualifications with start and end dates.
b. Example Edit:
Before: Bachelor’s Degree in Computer Science, ABC University
After: Bachelor of Science in Computer Science, ABC University (2018 – 2022)

1. Contact Information:
a. Ensure the phone number is in international format (+CountryCode PhoneNumber).
b. Example Edit:
Before: 0595345474
After: +972 59 534 5474

1. Technical Accessibility:
a. Use simplified explanations where necessary to ensure readability for both technical and non-technical reviewers.

1. Relevance & Impact:
a. Highlight achievements relevant to the job.
b. Remove unnecessary details that don’t add value.
c. Tailor CV content towards what the employer wants to see rather than just listing personal accomplishments.

CV:
${cv}

Task:
Review the provided CV and generate structured feedback in JSON format, including specific suggestions on how to edit each section.
 
Output Format without formatting json (without \`\`\`json):
{
  "comments": [
    {
      "title": "Section Name",
      "comment": "Specific improvement suggestion with example edits."
    },
    {
      "title": "Another Section Name",
      "comment": "Another specific edit suggestion."
    }
  ]
}
`;
  console.log(prompt.toString());
  const response = await openai().chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [{ role: "user", content: prompt }],
  });
  return JSON.parse(response.choices[0].message.content);
};
