<script setup>
    import { ref, onMounted } from "vue";
    import MarkdownIt from 'markdown-it'
    import YAML from "yaml";

    const md = new MarkdownIt()

    const props = defineProps({
        file: { type: String, required: true },
    });

    const data = ref({ category: "", intro: "", ports: [] });

    const yamlFiles = import.meta.glob("../data/ports/*/*.yaml", {
        query: "?raw",
        import: "default",
    });

    const statusClasses = {
        'Compliant': 'details custom-block',
        'Semistandard': 'warning custom-block',
        'Extended Semistandard': 'warning custom-block',
        'Noncompliant': 'important custom-block'
    };

    onMounted(async () => {
        try {
            const res = await fetch(`/data/menu/${props.file}`);
            const raw = await res.text();
            data.value = YAML.parse(raw);
            data.value.intro = md.render(data.value.intro);
            for (const port of data.value.ports) {
                port.description = md.render(port.description);
            };
        } catch (e) {
            console.error(`Port file not found: ${props.file}`, e);
        };
    });
</script>

<template>
    <section v-if="data.ports.length" class="my-8">
        <h3>{{ data.category }}</h3>
        <div v-html="data.intro" class="prose mb-4"></div>

        <div class="grid gap-4">
            <details
                v-for="port in data.ports"
                :key="port.name"
                :class="statusClasses[port.status] || 'details custom-block'"
            >
                <summary>{{ port.emoji }} {{ port.name }}</summary>
                <div class="vp-container-content">
                    <p><strong>Made By:</strong> {{ port.madeBy }}</p>
                    <p><strong>Status:</strong> {{ port.status }}</p>
                    <p><strong>Location:</strong> {{ port.location }}</p>
                    <p v-html="port.description"></p>
                </div>
            </details>
        </div>
    </section>

    <p v-else>No ports found for file: {{ props.file }}</p>
</template>
