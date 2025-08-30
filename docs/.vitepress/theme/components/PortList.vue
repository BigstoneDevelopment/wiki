<script setup>
    import { ref, onMounted } from 'vue';
    import YAML from 'yaml';

    const props = defineProps({
        file: { type: String, required: true }
    });

    const data = ref({ category: '', intro: '', ports: [] });

    const yamlFiles = import.meta.glob('../data/ports/*.yaml', { query: '?raw', import: 'default' });

    onMounted(async () => {
        const path = `../data/ports/${props.file}`;
        if (!yamlFiles[path]) {
            console.error(`Port file not found: ${path}`);
            return;
        };
        const raw = await yamlFiles[path]();
        data.value = YAML.parse(raw);
    });
</script>

<template>
    <section class="my-8">
        <h3>{{ data.category }}</h3>
        <div v-html="data.intro" class="prose mb-4"></div>

        <div class="grid gap-4">
            <div v-for="port in data.ports" :key="port.name" class="p-4 border rounded shadow">
                <h4>{{ port.emoji }} {{ port.name }}</h4>
                <p><strong>Made By:</strong> {{ port.madeBy }}</p>
                <p><strong>Status:</strong> {{ port.status }}</p>
                <p><strong>Location:</strong> {{ port.location }}</p>
                <p>{{ port.description }}</p>
            </div>
        </div>
    </section>
</template>
