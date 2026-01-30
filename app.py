import streamlit as st
import numpy as np
import matplotlib.pyplot as plt

st.set_page_config(
    page_title="Toluene Photolysis Simulator",
    layout="wide"
)

st.title("Toluene Photolysis Simulation")
st.markdown("Graduation Project – Photochemical Reaction Modeling")

initial_conc = st.slider(
    "Initial Toluene Concentration (ppm)",
    1.0, 100.0, 10.0
)

rate_constant = st.slider(
    "Photolysis Rate Constant",
    0.001, 1.0, 0.05
)

time = np.linspace(0, 100, 100)
concentration = initial_conc * np.exp(-rate_constant * time)

fig, ax = plt.subplots()
ax.plot(time, concentration)
ax.set_xlabel("Time")
ax.set_ylabel("Toluene Concentration")
ax.set_title("Photolysis Decay Curve")

st.pyplot(fig)
