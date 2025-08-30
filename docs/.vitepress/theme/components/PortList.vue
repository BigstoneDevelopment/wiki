<script setup>
    import { ref } from 'vue';
    import YAML from 'yaml';

    const props = defineProps({
        file: {
            type: String,
            required: true
        }
    });

    const category = ref('');
    const intro = ref('');
    const ports = ref([]);

    async function loadData() {
        const raw = await import(`../data/ports/${props.file}?raw`);
        const parsed = YAML.parse(raw.default);
        category.value = parsed.category;
        intro.value = parsed.intro;
        ports.value = parsed.ports;
    };

    loadData();
</script>

<template>
    <section class="my-8">
        <h3 class="text-xl font-bold mb-2">{{ category }}</h3>
        <div v-html="intro" class="prose mb-4"></div>

            <div class="grid gap-4">
            <div
                v-for="port in ports"
                :key="port.name"
                class="rounded-2xl p-4 border shadow-md bg-white"
            >
                <h4 class="text-lg font-bold flex items-center gap-2">
                    <span>{{ port.emoji }}</span> {{ port.name }}
                </h4>
                <p><strong>Made By:</strong> {{ port.madeBy }}</p>
                <p><strong>Status:</strong> {{ port.status }}</p>
                <p><strong>Location:</strong> {{ port.location }}</p>
                <p class="mt-2">{{ port.description }}</p>
            </div>
        </div>
    </section>
</template>
