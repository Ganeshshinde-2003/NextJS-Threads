"use client";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import Image from "next/image";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment({ threadId, currentUserImg, currentUserId }: Props) {
    const router = useRouter();
    const pathname = usePathname();
  
    const form = useForm({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
        thread: "",
      },
    });
  
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    //   await createThread(
    //     {
    //       text: values.thread,
    //       communityId: null,
    //       path: pathname,
    //     }
    //   );
  
      router.push("/");
    }
  return (
    <div>
      <Form {...form}>
        <form
          className="comment-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                  <Image src={currentUserImg} alt="userImage" width={48} height={48} className="rounded-full object-cover" />
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input type="text" placeholder="Comment..." className="no-focus text-light-1 outline-none" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-primary-500">
            Post Thread
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Comment;
