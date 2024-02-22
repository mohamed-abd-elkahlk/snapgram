import { useAddComents } from "@/lib/react-query/queries";
import { Models } from "appwrite";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { comentsValidation } from "@/lib/validation";
import { useToast } from "../ui";
import ComentsCard from "./ComentsCard";
const Coments = ({
  postId: posts,
  userId,
  coments,
}: {
  postId?: string;
  userId?: string;
  coments: Models.Document[];
}) => {
  const { mutateAsync: addComents, isPending: addComentsLoading } =
    useAddComents(posts!);
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof comentsValidation>>({
    resolver: zodResolver(comentsValidation),
    defaultValues: {
      content: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof comentsValidation>) {
    const newComent = await addComents({
      content: values.content,
      posts: posts,
      userId: userId,
    });

    if (!newComent) toast({ title: "faild to add coment" });

    toast({ title: "you now add new coment" });
  }

  return (
    <div className="mr-auto w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>share your opnion with others </FormLabel>
                <FormControl>
                  <Input
                    placeholder="coment"
                    {...field}
                    className="shad-input "
                  />
                </FormControl>
                <FormDescription>This will public coment</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={addComentsLoading}>
            Add Coment
          </Button>
        </form>
      </Form>
      <div className="mt-6 border p-6 rounded-lg">
        {coments?.length != 0 ? (
          coments?.map((coment) => (
            <ComentsCard
              key={coment.$id}
              title={coment.content}
              userId={coment.userId}
            />
          ))
        ) : (
          <div>
            <h1>no one has coment this post be the first one </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coments;
