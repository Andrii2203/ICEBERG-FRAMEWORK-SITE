"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import styles from "./IcebergHero.module.scss";

interface IcebergHeroProps {
  dict: {
    hero: {
      visibleTip: string;
      submergedMass: string;
      waterline: string;
      description: string;
    };
    common: {
      tagline: string;
    };
  };
}

export const IcebergHero = ({ dict }: IcebergHeroProps) => {
  return (
    <section className={styles.root}>
      <div className={styles.orbLeft} />
      <div className={styles.orbRight} />

      <div className={styles.heroText}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className={styles.tagline}>{dict.common.tagline}</span>
          <h1 className={styles.title}>
            ICEBERG
            <br />
            <span className={styles.titleAccent}>FRAMEWORK</span>
          </h1>
        </motion.div>
      </div>

      <div className={styles.vizWrap}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={styles.vizInner}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={styles.floatWrap}
          >
            <div className={styles.shapeWrap}>
              <svg
                className={styles.svgTip}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="tipGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--text)" />
                    <stop offset="100%" stopColor="var(--surface)" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 5 L85 95 L15 95 Z"
                  fill="url(#tipGradient)"
                  className={styles.svgTipPath}
                />
                <path
                  d="M50 5 L65 95 L35 95 Z"
                  fill="var(--text)"
                  className={styles.svgTipPathInner}
                />
              </svg>

              <div className={styles.waterlineGlow} />

              <svg
                className={styles.svgSubmerged}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="submergedGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--border)" />
                    <stop offset="100%" stopColor="var(--bg)" />
                  </linearGradient>
                </defs>
                <path
                  d="M15 0 L85 0 L95 20 L70 95 L30 95 L5 20 Z"
                  fill="url(#submergedGradient)"
                  className={styles.svgSubmergedPath}
                />
                <path
                  d="M15 0 L85 0 L75 85 L25 85 Z"
                  fill="var(--accent)"
                  className={styles.svgSubmergedPathAccent1}
                />
                <path
                  d="M50 0 L60 95 L40 95 Z"
                  fill="var(--accent)"
                  className={styles.svgSubmergedPathAccent2}
                />
              </svg>

              <div className={styles.submergedContent}>
                <div className={styles.visibleTipLabelWrap}>
                  <span className={styles.visibleTipLabel}>
                    {dict.hero.visibleTip}
                  </span>
                </div>

                <div className={styles.waterlineLabelWrap}>
                  <div className={styles.waterlineLine} />
                  <span className={styles.waterlineText}>
                    {dict.hero.waterline}
                  </span>
                </div>

                <div className={styles.submergedLabelWrap}>
                  <span className={styles.submergedMass}>
                    {dict.hero.submergedMass}
                  </span>
                  <p className={styles.description}>{dict.hero.description}</p>
                </div>

                {[...Array(6)].map((_, i) => {
                  const leftOffset = 20 + ((i * 123) % 61);
                  const topOffset = 160 + ((i * 456) % 201);
                  const duration = 4 + ((i * 789) % 5);
                  const delay = (i * 321) % 6;

                  return (
                    <motion.div
                      key={i}
                      className={styles.bubble}
                      style={{
                        left: `${leftOffset}%`,
                        top: `${topOffset}px`,
                      }}
                      animate={{
                        y: [-20, -100],
                        x: [-5, 5, -5],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration,
                        repeat: Infinity,
                        delay,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2 }}
        className={styles.scrollHint}
      >
        <span className={styles.scrollHintText}>Explore</span>
        <div className={styles.scrollHintLine} />
      </motion.div>

      <div className={styles.footer}>
        <div className={styles.footerText}>
          <p className={styles.copyright}>
            © 2026 Iceberg Framework <br className={styles.copyrightBr} />
            <span className={styles.version}>v1.2.0 Stable (MIT)</span>
          </p>
        </div>

        <div className={styles.social}>
          <a
            href="https://github.com/Andrii2203/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <span className={styles.srOnly}>GitHub</span>
            <Github className={styles.socialIcon} />
          </a>
          <a
            href="https://www.linkedin.com/in/andrii-shavel-976485187/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <span className={styles.srOnly}>LinkedIn</span>
            <Linkedin className={styles.socialIcon} />
          </a>
        </div>
      </div>
    </section>
  );
};
