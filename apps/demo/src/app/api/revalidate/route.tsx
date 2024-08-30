import { revalidatePath, revalidateTag } from "next/cache";

export const GET = async () => {
  revalidateTag("pokemon");
};
