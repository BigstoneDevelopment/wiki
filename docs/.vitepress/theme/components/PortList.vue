<script setup>
    import { ref, onMounted } from "vue";
    import MarkdownIt from 'markdown-it'
    import YAML from "yaml";

    const md = new MarkdownIt()

    const props = defineProps({
        file: { type: String, required: true },
    });

    const data = ref({ category: "", intro: "", ports: [] });

    const yamlFiles = import.meta.glob("../data/ports/*.yaml", {
        query: "?raw",
        import: "default",
    });

    const statusClasses = {
        'Compliant': 'vp-container vp-details vp-info',
        'Semistandard': 'vp-container vp-details vp-warning',
        'Extended Semistandard': 'vp-container vp-details vp-warning',
        'Noncompliant': 'vp-container vp-details vp-important'
    };

    onMounted(async () => {
        try {
            const res = await fetch(`/data/ports/${props.file}`);
            const raw = await res.text();
            data.value = YAML.parse(raw);
            data.value.intro = md.render(data.value.intro);
        } catch (e) {
            console.error(`Port file not found: ${props.file}`, e);
        };
    });
</script>

<template>
    <section v-if="data.ports.length" class="my-8">
        <h3>{{ data.category }}</h3>

        <!-- Intro rendered as Markdown -->
        <div v-html="data.intro" class="prose mb-4"></div>

        <div class="grid gap-4">
            <details
                v-for="port in data.ports"
                :key="port.name"
                :class="statusClasses[port.status] || 'vp-container vp-details'"
            >
                <summary>{{ port.emoji }} {{ port.name }}</summary>
                <div class="vp-container-content">
                    <p><strong>Made By:</strong> {{ port.madeBy }}</p>
                    <p><strong>Status:</strong> {{ port.status }}</p>
                    <p><strong>Location:</strong> {{ port.location }}</p>
                    <p>{{ port.description }}</p>
                </div>
            </details>
        </div>
    </section>

    <p v-else>No ports found for file: {{ props.file }}</p>
</template>
