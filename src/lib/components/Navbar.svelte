<script lang="ts">
	import { page } from '$app/stores';
	import Close from '$lib/components/icon/Close.svelte';
	import Hamburger from '$lib/components/icon/Hamburger.svelte';

	let isNavShowing = false;
</script>

<svelte:head>
	{#if isNavShowing}
		<style lang="postcss">
			body {
				@apply overflow-hidden md:overflow-auto;
			}
		</style>
	{/if}
</svelte:head>

<button
	class="fixed z-50 top-6 right-6 md:hidden"
	class:text-goldenFizz={isNavShowing}
	class:text-daisyBush={!isNavShowing}
	on:click={() => {
		isNavShowing = !isNavShowing;
	}}
>
	{#if isNavShowing}
		<Close width={32} height={32} />
	{:else}
		<Hamburger width={32} height={32} />
	{/if}
</button>

<header
	class="fixed w-full h-screen text-center transition duration-500 ease-in-out -translate-x-full md:h-full md:relative md:col-span-3 md:-translate-x-0 bg-daisyBush"
	class:-translate-x-0={isNavShowing}
>
	<div class="my-10 md:mb-24">
		<a href="/invoices"><img src="/images/logo.svg" alt="The Dollar Holler" class="mx-auto" /></a>
	</div>

	<nav>
		<ul class="text-2xl font-bold list-none">
			<li><a href="/invoices" class:active={$page.url.pathname === '/invoices'}>Invoices</a></li>
			<li><a href="/clients" class:active={$page.url.pathname === '/clients'}>Clients</a></li>
			<li><a href="/settings" class:active={$page.url.pathname === '/settings'}>Settings</a></li>
			<li><a href="/logout" class:active={$page.url.pathname === '/logout'}>Logout</a></li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	nav ul li {
		@apply mb-6;
	}
	nav ul li a {
		@apply font-bold text-white hover:text-goldenFizz;
	}
	nav ul li a.active {
		@apply text-robinEggBlue px-8 transition-[padding];
		background: url('/images/active-nav--left.svg') left top no-repeat,
			url('/images/active-nav--right.svg') right top no-repeat;
	}
	nav ul li a.active:hover {
		@apply px-10;
	}
</style>
