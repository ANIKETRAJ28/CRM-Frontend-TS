import { motion } from "framer-motion";
import { ChartBar, Clock, Users2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/index";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/store/slices/authSlice";

export function Home() {
  const { id } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      dispatch(setUser());
    }
    if (id) {
      navigate("/org");
    } else {
      getUserData();
    }
  }, [id, navigate, dispatch]);

  return (
    <div>
      <section className="pt-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 text-transparent bg-clip-text"
          >
            Transform Your Customer Relations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-blue-300/80 max-w-2xl mx-auto mb-12"
          >
            Streamline your business relationships with our intelligent CRM
            platform. Boost productivity, increase sales, and deliver
            exceptional customer experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-8 py-6 text-lg"
            >
              Start Free Trial
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="transform transition-all duration-300"
            >
              <Card className="p-6 bg-[#000B2E]/50 border-blue-900/20 hover:border-blue-700/50 transition-colors duration-300">
                <ChartBar className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-blue-200 mb-2">
                  Advanced Analytics
                </h3>
                <p className="text-blue-300/70">
                  Get deep insights into your customer relationships with
                  powerful analytics tools.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="transform transition-all duration-300"
            >
              <Card className="p-6 bg-[#000B2E]/50 border-blue-900/20 hover:border-blue-700/50 transition-colors duration-300">
                <Users2 className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-blue-200 mb-2">
                  Team Collaboration
                </h3>
                <p className="text-blue-300/70">
                  Work seamlessly with your team to manage customer
                  relationships effectively.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="transform transition-all duration-300"
            >
              <Card className="p-6 bg-[#000B2E]/50 border-blue-900/20 hover:border-blue-700/50 transition-colors duration-300">
                <Clock className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-blue-200 mb-2">
                  Automation
                </h3>
                <p className="text-blue-300/70">
                  Save time with intelligent automation features for routine
                  tasks.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
