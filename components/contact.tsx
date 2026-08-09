"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEmail, setSubscriptionEmail] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitted(true);
    form.reset();
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscriptionEmail) {
      console.log("Subscription email:", subscriptionEmail);
      setIsSubscribed(true);
      setSubscriptionEmail("");
    }
  };


  return (
    <section id="contact" className="section-container">
      <h2 className="section-heading fade-in">Get In Touch</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto fade-in">
        Have a project in mind or want to discuss a potential collaboration? I'd
        love to hear from you! Fill out the form below or reach out through any
        of my contact channels.
      </p>

      <div className="grid grid-cols-1 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-8"
        >


          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to my newsletter to receive updates on my latest
              projects and articles.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                <CheckCircle className="h-5 w-5" />
                <p>Thank you for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={subscriptionEmail}
                  onChange={(e) => setSubscriptionEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-muted/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-500">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-medium">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I'll get back to you as soon
                      as possible.
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <div className="space-y-2">
                            <FormLabel>Your Name</FormLabel>
                            <Input
                              placeholder="Please Input your name"
                              {...field}
                            />
                            <FormMessage />
                          </div>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <div className="space-y-2">
                            <FormLabel>Email Address</FormLabel>
                            <Input
                              type="email"
                              placeholder="Valid@example.com"
                              {...field}
                            />
                            <FormMessage />
                          </div>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <div className="space-y-2">
                          <FormLabel>Subject</FormLabel>
                          <Input placeholder="Project Inquiry" {...field} />
                          <FormMessage />
                        </div>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <div className="space-y-2">
                          <FormLabel>Message</FormLabel>
                          <Textarea
                            placeholder="Tell me about your project or inquiry..."
                            className="min-h-[120px] resize-y"
                            {...field}
                          />
                          <FormMessage />
                        </div>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
