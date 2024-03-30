import { z } from "zod";

const envSchema = z.object({
  GITHUB_ADMIN_NAME: z.string().min(1),
  GITHUB_REPO_NAME: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  AUTH_URL: z.string().url(),
});

let env: z.infer<typeof envSchema> = {
  GITHUB_ADMIN_NAME: "",
  GITHUB_REPO_NAME: "",
  GITHUB_CLIENT_ID: "",
  GITHUB_CLIENT_SECRET: "",
  AUTH_SECRET: "",
  AUTH_URL: "",
};

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log(error);
    throw new Error(
      "環境變數錯誤，請檢查以下變數是否設定正確\n" +
        error.errors.map((e) => e.path[0]).join("\n"),
    );
  }
}

export default env;
