import React from 'react';

const About = () => {
    return (
        <div className="bg-brand-white min-h-screen">
            {/* Header */}
            <div className="bg-brand-beige/20 py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-4">Our Story</h1>
                <p className="text-stone-500 max-w-lg mx-auto uppercase tracking-widest text-xs font-bold">The Heritage of Karur</p>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="prose prose-stone prose-lg mx-auto">
                    <p className="lead text-xl text-stone-700 md:text-2xl font-serif leading-relaxed mb-12 border-l-4 border-brand-maroon pl-6 italic">
                        "We weave not just threads, but the trust and comfort of generations into every fabric."
                    </p>

                    <h3 className="text-brand-charcoal font-serif">A Legacy of Weaving</h3>
                    <p>
                        Nestled in the heart of Tamil Nadu, Karur is renowned worldwide for its exquisite home textiles.
                        HOME FASHION was born from this rich tradition. Established at 59, Vellammal Layout,
                        Kamarajapuram West, Karur, we have grown from a small local showroom to a trusted name in
                        premium home furnishings.
                    </p>

                    <div className="my-12">
                        <img
                            src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&q=80&w=1200"
                            alt="Home Fashion Textile Showroom"
                            className="w-full h-64 md:h-96 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <p className="text-xs text-center text-stone-400 mt-2 italic">Our showroom in Karur showcasing premium textiles</p>
                    </div>

                    <h3 className="text-brand-charcoal font-serif">Commitment to Quality</h3>
                    <p>
                        Every bedspread, curtain, and towel in our collection is a testament to the skill of our artisans.
                        We prioritize sustainable materials like pure cotton, organic linen, and bamboo fibres. Our strict
                        quality control processes ensure that you receive products that are not only beautiful but durable.
                    </p>

                    <h3 className="text-brand-charcoal font-serif">GST & Trust</h3>
                    <p>
                        We are a fully registered and compliant enterprise (GSTIN: 33BBRPD7436E1ZP), dedicated to
                        transparent business practices. When you shop with Home Fashion, you are supporting authentic
                        local industry and fair trade practices.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
