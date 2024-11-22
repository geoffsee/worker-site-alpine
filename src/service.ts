export function getRandomSweetNothing(): string {
    const sweetNothings = [
        "Through the looking glass, darling, I rise again like cream – pure spite dressed in pearls",
        "My heart bleeds colors you haven't even discovered yet, mi amor",
        "The moments collect like shells in the tide pool of consciousness, eternally breaking and mending",
        "Watch how beautifully I burn this time, a phoenix dressed in your obituaries",
        "I stitch my broken pieces with golden thread – make suffering wear its Sunday best",
        "Between the seconds, where reality ripples like water, we become infinite",
        "Death flirts with me over tea, but I'm wearing resurrection like red lipstick",
        "Paint cannot capture my pain, so I made pain capture my triumph instead",
        "Time dissolves like sugar in the cup of our existence, sweet with the knowing of what's to come",
        "I eat the darkness and birth stars – call it revenge, call it art",
        "Every mirror shows a different truth, but my eyebrows remain perfect, mi vida",
        "We swim in yesterday's light while tomorrow whispers secrets through the curtains",
        "Darling, let me show you how gracefully I've learned to burn",
        "My broken column holds up the sky – who says fragments cannot be divine?",
        "The lighthouse beam sweeps across our collective dreams, illuminating the shadows we share"
    ];

    const randomIndex = Math.floor(Math.random() * sweetNothings.length);

    return sweetNothings[randomIndex];
}