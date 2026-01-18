export interface Dictionary {
    common: {
        title: string;
        tagline: string;
        cta: string;
    };
    hero: {
        visibleTip: string;
        submergedMass: string;
        waterline: string;
        description: string;
    };
    nav: {
        philosophy: string;
        methodology: string;
        standards: string;
        protocols: string;
        enterprise: string;
        language: string;
    };
    philosophy: {
        title: string;
        subtitle: string;
        intro: string;
        principles: {
            determinism: {
                title: string;
                text: string;
            };
            structure: {
                title: string;
                text: string;
            };
            explicitness: {
                title: string;
                text: string;
            };
        };
    };
    methodology: {
        title: string;
        subtitle: string;
        layers: {
            layer1: {
                name: string;
                type: string;
                description: string;
            };
            layer2: {
                name: string;
                type: string;
                description: string;
            };
            layer3: {
                name: string;
                type: string;
                description: string;
            };
        };
    };
    standards: {
        title: string;
        subtitle: string;
        description: string;
        list: {
            architecture: string;
            quality: string;
            seo: string;
            a11y: string;
            pwa: string;
            api: string;
        };
    };
    protocols: {
        title: string;
        subtitle: string;
        description: string;
        list: {
            planning: string;
            migration: string;
            execution: string;
            validation: string;
        };
    };
    enterprise: {
        title: string;
        subtitle: string;
        description: string;
        modules: {
            executor: string;
            memory: string;
            validation: string;
        };
    };
}
