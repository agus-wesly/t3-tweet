import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        topicId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          topicId: input.topicId,
        },
        include: {
          topic: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        topic: z.string().max(180),
        note: z.string().max(180),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          content: input.note,
          topicId: input.topic,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        noteId: z.string().max(180),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.delete({
        where: {
          id: input.noteId,
        },
      });
    }),
});
