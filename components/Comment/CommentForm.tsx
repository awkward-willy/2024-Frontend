import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createComment } from "@/actions/createComment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  body: z.string().trim().min(1, { message: "Comment 不得為空" }),
});

interface PostFormProps {
  setBody: (body: string) => void;
  body: string;
  type: "create" | "edit";
  issueNum: number;
}

export default function CommentForm({
  setBody,
  body,
  type,
  issueNum,
}: PostFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async () => {
    const { body } = form.getValues();
    const response = await createComment({
      number: issueNum.toString(),
      body,
    });
    if (response) {
      location.reload();
      toast("成功新增留言", {
        icon: <CheckCircledIcon color="green" />,
      });
      setBody("");
      form.reset();
    } else {
      toast("新增留言失敗", {
        icon: <CrossCircledIcon color="red" />,
        description: "請再試一次",
      });
    }
  };

  useEffect(() => {
    form.setValue("body", body);
  }, [body, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-4 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Body"
                    value={body}
                    onChange={(e) => {
                      setBody(e.target.value);
                    }}
                    className="h-32 resize-none bg-white placeholder:text-slate-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" variant="ghost" className="bg-secondary/50">
          {type === "create" ? "新增" : "編輯"}
        </Button>
      </form>
    </Form>
  );
}
