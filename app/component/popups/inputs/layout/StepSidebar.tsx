import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './StepSidebar.module.css'; // Import the CSS module

const steps = [
  "Your Full Name",
  "Phone No",
  "Company Name",
  "Distribution Challenge",
  "Reviews or Query"
];

const StepSidebar = ({ step }: { step: number }) => {
  return (
    <div className={styles.sidebar}>
      <motion.div
        className={styles.logoContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/logo.png"
          alt="Spot Tracker Logo"
          width={250}
          height={50}
          className={styles.logo}
          priority
        />
      </motion.div>

      <div className={styles.stepsContainer}>
        {steps.map((label, index) => {
          const isActive = step === index;
          const isCompleted = step > index;
          const isUpcoming = step < index;

          return (
            <motion.div
              key={index}
              className={styles.stepItem}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Dot + Line */}
              <div className={styles.stepDotLine}>
                {/* Animated Circle */}
                <motion.div
                  className={`${styles.stepDot} 
                    ${isCompleted ? styles.stepDotCompleted : 
                      isActive ? styles.stepDotActiveBorder : 
                      styles.stepDotUpcomingBorder
                    }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {isCompleted && (
                    <motion.svg
                      className={styles.stepCheckmark}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                  {isActive && (
                    <motion.div
                      className={styles.stepInnerDot}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    />
                  )}
                </motion.div>

                {/* Animated Connector */}
                {index < steps.length - 1 && (
                  <motion.div
                    className={`${styles.stepConnector} 
                      ${isCompleted ? styles.stepConnectorCompleted : styles.stepConnectorUpcoming}
                    `}
                    initial={{ borderColor: 'rgba(209, 213, 219, 0)' }}
                    animate={{
                      borderColor: isCompleted ? 'rgba(5, 95, 168, 0.5)' : 'rgba(209, 213, 219, 0.5)',
                      borderStyle: isCompleted ? 'solid' : 'dashed'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              {/* Label with animation */}
              <motion.p
                className={`${styles.stepLabel} ${isActive ? styles.stepLabelActive : isCompleted ? styles.stepLabelCompleted : styles.stepLabelUpcoming}`}
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {label}
                {isActive && (
                  <motion.span
                    className={styles.stepActiveLine}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                )}
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StepSidebar;